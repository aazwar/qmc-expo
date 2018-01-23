import Storable from '../Storable';

export default class Conversation extends Storable {
  messages = [
    {
      _id: 1,
      text: `Dear QMC patient,
You can chat with our Staff here.`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'QMC Staff',
      },
    },
  ];
}
