import {
  Home,
  Users,
  Package,
  Clock,
  UserCog,
  Boxes,
  ClipboardList,
  LineChart,
  DollarSign,
  LucideIcon,
  User,
  TicketPercent,
  Calendar1,
  CalendarCheck,
  LetterText,
  Folder,
  Table,
  Clipboard,
  Contact2,
  ArrowLeftRight,
  Receipt,
  CalendarClock,
  Newspaper,
  Gem,
  Search,
  User2,
  HandHelping,
  UserCircle,
  MessageCircleQuestion,
  Trash2
} from 'lucide-react'
import { MdMeetingRoom, MdPersonSearch } from 'react-icons/md'
export type SideBarItem = {
  title: string
  url?: string
  icon: LucideIcon
  isActive?: boolean
  pages?: SideBarItem[],
  id?: string,
  isFavorite?: boolean
}
export const sideData = {
  navMain: [
    {
      title: 'Home',
      url: '/admin',
      icon: Home,
    }
  ],
  workspaces: [
    {
      title: 'Account',
      icon: Users,
      pages: [
        {
          title: 'Accounts',
          url: '/accounts',
          icon: UserCircle,
        },
      ]
    },
    {
      title: 'Customers',
      icon: User,
      pages: [
        {
          title: 'Customers',
          url: '/customers',
          icon: Search
        },
        {
          title: 'Memberships',
          url: '/memberships',
          icon: TicketPercent
        }
      ]
    },
    {
      title: 'Employees',
      icon: Users,
      pages: [
        {
          title: 'Employees',
          url: '/employees',
          icon: UserCog
        },
        {
          title: 'Shift',
          url: '/shifts',
          icon: Calendar1
        },
        {
          title: 'Schedule',
          url: '/schedules',
          icon: CalendarCheck
        }
      ]
    },
    {
      title: 'Appointments',
      icon: HandHelping,
      pages: [
        {
          title: 'Customer requests',
          url: '/requests',
          icon: LetterText
        },
        {
          title: 'Appointments',
          url: '/appointments',
          icon: Clock
        }
      ]
    },
    {
      title: 'Products',
      icon: Boxes,
      pages: [
        {
          title: 'Categories',
          url: '/categories',
          icon: Folder
        },
        {
          title: 'Employees categories',
          url: '/employees-categories',
          icon: Table
        },
        {
          title: 'Services',
          url: '/services',
          icon: Package
        }
      ]
    },
    {
      title: 'Applications',
      icon: ClipboardList,
      pages: [
        {
          title: 'Applications',
          url: '/applications',
          icon: Clipboard
        },
        {
          title: 'Contacts',
          url: '/contacts',
          icon: Contact2
        }
      ]
    },
    {
      title: 'Transactions',
      icon: ArrowLeftRight,
      pages: [
        {
          title: 'Transactions',
          url: '/transactions',
          icon: LineChart
        },
        {
          title: 'Commission types',
          url: '/commissions',
          icon: Receipt
        },
        {
          title: 'Employees commissions',
          url: '/employees-commissions',
          icon: DollarSign
        }
      ]
    },
    {
      title: 'News & Promotions',
      icon: CalendarClock,
      pages: [
        {
          title: 'News',
          url: '/news',
          icon: Newspaper
        },
        {
          title: 'Promotions',
          url: '/promotions',
          icon: Gem
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Trash',
      url: '#',
      icon: Trash2
    },
    {
      title: 'Help',
      url: '#',
      icon: MessageCircleQuestion
    }
  ],
}
