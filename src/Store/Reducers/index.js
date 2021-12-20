import { combineReducers } from 'redux'

// import notifyReducer from 'react-redux-notify'
import UserReducer from './UserReducer'
import ChangePasswordReducer from './ChangePasswordReducer'
import SubscriptionReducer from './SubscriptionReducer'
import CardsReducer from './CardsReducer'
import BankAccountReducer from './BankAccountReducer'
import KycDocumentReducer from './KycDocumentReducer'
import WalletReducer from './WalletReducer'
import TransactionReducer from './TransactionReducer'
import WithDrawReducer from './WithDrawReducer'
import PageReducer from './PageReducer'
import ErrorReducer from './ErrorReducer'
import ProductOwnerReducer from './ProductOwnerReducer'
import PostReducer from './PostReducer'
import FollowReducer from './FollowReducer'
import VerificationDocumentReducer from './VerificationDocumentReducer'
import CommentsReducer from './CommentsReducer'
import FavReducer from './FavReducer'
import BookmarkReducer from './BookmarkReducer'
import SendTipReducer from './SendTipReducer'
import HomeReducer from './HomeReducer'
import OtherUserReducer from './OtherUserReducer'
import PostLikesReducer from './PostLikesReducer'
import ChatReducer from './ChatReducer'
import NotificationReducer from './NotificationReducer'

import startup from '../Startup'
import user from '../User'
import theme from '../Theme'
import language from '../Language'

export default combineReducers({
  startup,
  user,
  theme,
  language,
  users: UserReducer,
  changePassword: ChangePasswordReducer,
  // notifications: notifyReducer,
  subscriptions: SubscriptionReducer,
  cards: CardsReducer,
  bankAccount: BankAccountReducer,
  kycDocument: KycDocumentReducer,
  wallet: WalletReducer,
  transaction: TransactionReducer,
  withDraw: WithDrawReducer,
  page: PageReducer,
  errorDetails: ErrorReducer,
  proOwner: ProductOwnerReducer,
  post: PostReducer,
  follow: FollowReducer,
  docs: VerificationDocumentReducer,
  comment: CommentsReducer,
  fav: FavReducer,
  bookmark: BookmarkReducer,
  tip: SendTipReducer,
  home: HomeReducer,
  otherUser: OtherUserReducer,
  postLike: PostLikesReducer,
  chat: ChatReducer,
  notification: NotificationReducer,
})
