import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';


export const sideBarMenuItems = [
    {
      href: '/sidebar',
      icon: <InboxIcon />,
      title: 'Sidebar',
      childrens: [
        {
          href: '/financial-dashobard/my-gold-financials',
          title: 'Financials',
        },
        {
          href: '/retail-dashboard/retail',
          title: 'Retail',
        },
        {
          href: '/inventory-dashboard/inventory',
          title: 'Inventory',
        },
        {
          href: '/dashboard/goldbank-dashboard',
          title: 'CRM',
        },
      ],
    },
  
  
    {
      href: '/',
      icon: <MailIcon />,
      title: 'Home',
    },
  ];
  