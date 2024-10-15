/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import dynamic from 'next/dynamic';
import React, { Fragment } from 'react';

const AppsByTag = dynamic(() => import('./AppsByTag'));
const CategoriesSection = dynamic(() => import('./CategoriesSection'));
const BlogSection = dynamic(() => import('./BlogSection'));

type AppsByTagProps = {
  objectId: string;
  objectType: 'appsTagSection';
  children?: any;
};

type CategoryProps = {
  objectId: string;
  objectType: 'categoriesSection';
  children?: any;
};

type BlogProps = {
  objectId: string;
  objectType: 'blogsSection';
  children?: any;
};

type ChildType = AppsByTagProps | CategoryProps | BlogProps;

const componentMap: {
  // eslint-disable-next-line no-unused-vars
  [key in ChildType['objectType']]: React.ComponentType<any>;
} = {
  appsTagSection: AppsByTag,
  categoriesSection: CategoriesSection,
  blogsSection: BlogSection,
};

const renderChild = (child: ChildType) => {
  const Component = componentMap[child.objectType];

  if (!Component) return null;

  if (child.children) {
    return (
      <Fragment key={child.objectId}>
        <Component {...child}>
          {renderChildren(child.children)}
        </Component>
      </Fragment>
    );
  }

  return (
    <Fragment key={child.objectId}>
      <Component {...child} />
    </Fragment>
  );
};

const renderChildren = (children?: ChildType[] | ChildType) => {
  if (Array.isArray(children)) return children.map(renderChild);
  return renderChild(children as ChildType);
};

const DynamicContentRenderer = ({ sections }: { sections: ChildType[] }) => {
  return <Fragment>{renderChildren(sections)}</Fragment>;
};

export default DynamicContentRenderer;
