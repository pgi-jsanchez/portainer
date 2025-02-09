import _ from 'lodash';

import { EdgeGroup } from '@/react/edge/edge-groups/types';

import { Select } from '@@/form-components/ReactSelect';

type SingleValue = EdgeGroup['Id'];

interface Props {
  items: EdgeGroup[];
  value: SingleValue[];
  onChange: (value: SingleValue[]) => void;
}

export function EdgeGroupsSelector({ items, value, onChange }: Props) {
  const valueGroups = _.compact(
    value.map((id) => items.find((item) => item.Id === id))
  );

  return (
    <Select
      aria-label="Edge groups"
      options={items}
      isMulti
      getOptionLabel={(item) => item.Name}
      getOptionValue={(item) => String(item.Id)}
      value={valueGroups}
      onChange={(value) => {
        onChange(value.map((item) => item.Id));
      }}
      placeholder="Select one or multiple group(s)"
      closeMenuOnSelect={false}
    />
  );
}
