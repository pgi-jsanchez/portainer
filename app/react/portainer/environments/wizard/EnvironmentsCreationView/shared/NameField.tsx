import { useField } from 'formik';
import { string } from 'yup';
import { useRef, useEffect } from 'react';

import { getEnvironments } from '@/react/portainer/environments/environment.service';
import { useDebounce } from '@/react/hooks/useDebounce';

import { FormControl } from '@@/form-components/FormControl';
import { Input } from '@@/form-components/Input';

interface Props {
  readonly?: boolean;
  tooltip?: string;
  placeholder?: string;
}

export function NameField({
  readonly,
  tooltip,
  placeholder = 'e.g. docker-prod01 / kubernetes-cluster01',
}: Props) {
  const [{ value }, meta, { setValue }] = useField('name');

  const id = 'name-input';

  const [debouncedValue, setDebouncedValue] = useDebounce(value, setValue);

  useEffect(() => {
    setDebouncedValue(value);
  }, [setDebouncedValue, value]);

  return (
    <FormControl
      label="Name"
      required
      errors={meta.error}
      inputId={id}
      tooltip={tooltip}
    >
      <Input
        id={id}
        name="name"
        onChange={(e) => setDebouncedValue(e.target.value)}
        value={debouncedValue}
        data-cy="endpointCreate-nameInput"
        placeholder={placeholder}
        readOnly={readonly}
      />
    </FormControl>
  );
}

export async function isNameUnique(name = '') {
  if (!name) {
    return true;
  }

  try {
    const result = await getEnvironments({
      limit: 1,
      query: { name, excludeSnapshots: true },
    });
    return (
      result.totalCount === 0 || result.value.every((e) => e.Name !== name)
    );
  } catch (e) {
    // if backend fails to respond, assume name is unique, name validation happens also in the backend
    return true;
  }
}

function cacheTest(
  asyncValidate: (val?: string) => Promise<boolean> | undefined
) {
  let valid = true;
  let value = '';

  return async (newValue = '') => {
    if (newValue !== value) {
      value = newValue;

      const response = await asyncValidate(newValue);
      valid = !!response;
    }
    return valid;
  };
}

export function useNameValidation() {
  const uniquenessTest = useRef(cacheTest(isNameUnique));

  return string()
    .required('Name is required')
    .test('unique-name', 'Name should be unique', uniquenessTest.current);
}
