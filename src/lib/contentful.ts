import { createClient } from 'contentful';
import { removeLeadingSlash } from '@/utils/string';
/* eslint-disable @typescript-eslint/no-explicit-any */
interface Entry {
  objectId: string;
  objectType: string;
  children?: Entry[];
  [key: string]: string | number | Entry | Entry[] | undefined;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});


const getEntries = async (
  contentType: string,
  queryParams?: Record<string, string | number | undefined>
) => {
  const entries = await client.getEntries({
    content_type: contentType,
    include: 10,
    ...queryParams,
  });
  return entries;
};

function parseField(value: any): any {
  if (Array.isArray(value)) return value.map(parseField);
  if (typeof value === 'object' && value !== null) return parseEntry(value);
  return value;
}

export function parseEntry(entry: any): Entry {
  if (!entry.sys) return entry;

  const objectId = entry.sys?.id;
  const objectType = entry.sys?.contentType?.sys?.id || entry.sys?.type;

  if (entry.sys?.type === 'Asset') {
    const asset = entry;
    return {
      objectId,
      objectType,
      src: `https:${asset.fields.file.url as string}`,
      alt: asset.fields.title,
      fileName: asset.fields.file.fileName,
      fileType: asset.fields.file.contentType,
      width: asset.fields.file.details.image?.width || null,
      height: asset.fields.file.details.image?.height || null,
    };
  }

  return {
    objectId,
    objectType,
    ...Object.fromEntries(
      Object.entries(entry.fields ?? {}).map(([key, value]) => [key, parseField(value)])
    ),
  };
}

export async function getObject(contentType: string, queryParams?: Record<string, string>): Promise<Entry | null> {
  const response = await getEntries(contentType, queryParams);
  const { items } = response;
  if (items.length === 0) return null;
  const parsedEntry = parseEntry(items[0]);
  return parsedEntry;
}


export async function getAllObjects(contentType: string, queryParams?: Record<string, string>): Promise<Entry[]> {
  const { items } = await getEntries(contentType, queryParams);
  return items.map((item) => parseEntry(item));
}

export async function getPagePaths(): Promise<string[]> {
  const { items } = await getEntries('page');
  const paths = items.map((page) =>
    page.fields.slug ? removeLeadingSlash(page.fields.slug as string) : undefined
  );
  return paths.filter((path) => !!path) as string[];
}

export async function getEntriesFromSlug(slug: string, depth?: number) {
  const entries = await getEntries('page', {
    'fields.slug': removeLeadingSlash(slug),
    include: typeof depth === 'number' ? depth : 10,
  });
  return entries;
}

export async function getPageFromSlug(slug: string): Promise<Entry> {
  const entries = await getEntriesFromSlug(slug);
  if (entries.items.length === 0) throw new Error('Page not found');
  return parseEntry(entries.items[0]);
}

