import defaultSettings from '@/settings'
import { pageTitle } from '@/constants';

const title = pageTitle

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
