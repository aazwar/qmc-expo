import { Notifications, Permissions } from 'expo';
import Setting from './Setting';
import Conversation from './chat/Conversation';

const SERVER = 'http://192.168.0.31:8080';
//const SERVER = 'http://sandbox.fuwafuwa.web.id/qmc';

async function register(setting, conversation) {
  if (!setting) {
    setting = new Setting();
    await setting.load();
  }
  if (!conversation) {
    conversation = new Conversation();
    await conversation.load();
  }

  if (conversation.registered) return;

  if (!conversation.push_token) {
    conversation.push_token = await Notifications.getExpoPushTokenAsync();
    conversation.channel_id = `QMC-${conversation.push_token.replace(/.*\[(.*)\]/, '$1')}`;
    conversation.store();
  }

  let name = setting.name;
  if (!name) name = conversation.channel_id.substr(0, 8);
  let response = fetch(`${SERVER}/ajax/chat/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      channel_id: conversation.channel_id,
      push_token: conversation.push_token,
    }),
  }).then(response => {
    if (response.status == 200 && response._bodyText == 'Success') {
      conversation.registered = true;
      conversation.store();
    }
  });
}

async function change_name(name) {
  conversation = new Conversation();
  await conversation.load();
  let response = fetch(`${SERVER}/ajax/chat/change-name`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      channel_id: conversation.channel_id,
    }),
  });
}

async function ask_permission() {
  try {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return false;
    }
  } catch (err) {
    return false;
  }
  return true;
}

export { register, change_name, ask_permission, SERVER };
