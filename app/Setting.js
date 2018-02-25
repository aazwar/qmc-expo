import Storable from './Storable';

export default class Setting extends Storable {
  name = '';
  family_name = '';
  mobile = '';
  birth_date = '';
  appointments = [];
  reviews = [];
}
