import {
  Home,
  Boxes,
  ClipboardList,
  LineChart,
  LucideIcon,
  CalendarCheck,
  LetterText,
  Contact2,
  ArrowLeftRight,
  HandHelping,
  UserCircle,
  MessageCircleQuestion,
  Trash2
} from 'lucide-react'
export const sideData = {
  navMain: [
    {
      title: 'Home',
      url: '/manager',
      icon: Home
    }
  ],
  workspaces: [
    {
      title: 'Requests',
      icon: ClipboardList,
      url: '/manager/requests'
    },
    {
      title: 'Applications',
      icon: LetterText,
      url: '/manager/applications'
    },
    {
      title: 'Contacts',
      icon: Contact2,
      url: '/manager/contacts'
    },
  ]
}
