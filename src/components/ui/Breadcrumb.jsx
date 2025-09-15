import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  
  const routeMap = {
    '/student-dashboard': 'Dashboard',
    '/submit-feedback': 'Submit Feedback',
    '/student-profile': 'My Profile',
    '/admin-dashboard': 'Dashboard',
    '/manage-feedback': 'Manage Feedback',
    '/manage-students': 'Manage Students',
    '/manage-courses': 'Manage Courses',
    '/admin-profile': 'Account Settings',
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Home', path: '/' }];

    let currentPath = '';
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap?.[currentPath] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      breadcrumbs?.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground transition-smooth"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;