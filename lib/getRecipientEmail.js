/*
  The following function will take a chat array and filter out the user
  that is the recipient of the message.

  This is because two users will essentially share the same chat document,
  so we need to filter out the recipient.
*/
const getRecipientEmail = (users, userLoggedIn) => users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0]

export default getRecipientEmail