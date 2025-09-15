import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'student', userName = 'John Doe', userEmail = 'john@example.com' }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const studentNavItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Submit Feedback', path: '/submit-feedback', icon: 'MessageSquarePlus' },
    { label: 'My Profile', path: '/student-profile', icon: 'User' },
  ];

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
    { label: 'Manage Feedback', path: '/manage-feedback', icon: 'MessageSquare' },
    { label: 'Manage Students', path: '/manage-students', icon: 'Users' },
    { label: 'Manage Courses', path: '/manage-courses', icon: 'BookOpen' },
  ];

  const navItems = userRole === 'admin' ? adminNavItems : studentNavItems;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-100 shadow-soft">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-20 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard'} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="MessageSquare" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold text-foreground">EduFeedback</span>
                <span className="text-sm text-muted-foreground font-medium">Pro</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
            </Button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-smooth"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-foreground">{userName}</span>
                  <span className="text-xs text-muted-foreground">{userRole === 'admin' ? 'Administrator' : 'Student'}</span>
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
              </Button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-200">
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                        <p className="text-xs text-muted-foreground">{userEmail}</p>
                        <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link
                      to={userRole === 'admin' ? '/admin-profile' : '/student-profile'}
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted rounded-md transition-smooth"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span>Account Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-muted rounded-md transition-smooth"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="px-6 py-4 space-y-2">
              {navItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;