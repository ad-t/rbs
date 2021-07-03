import * as React from 'react';
import {
  Form,
  Radio,
  CheckboxProps,
  InputOnChangeData,
} from 'semantic-ui-react';
import { SearchByType } from 'src/shared/enums';

interface SearchProps {
  search: string;
  searchType: SearchByType;
  onRadioChange: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => void;
  onSearchChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => void;
}

export function Search({
  search,
  searchType,
  onRadioChange,
  onSearchChange,
}: SearchProps) {
  return (
    <>
      <p>Find by:</p>
      <Form>
        <Form.Field>
          <Radio
            label="Name"
            name={SearchByType.NAME}
            value={SearchByType.NAME}
            checked={searchType === SearchByType.NAME}
            onChange={onRadioChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Email"
            name={SearchByType.EMAIL}
            value={SearchByType.EMAIL}
            checked={searchType === SearchByType.EMAIL}
            onChange={onRadioChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Phone"
            name={SearchByType.PHONE}
            value={SearchByType.PHONE}
            checked={searchType === SearchByType.PHONE}
            onChange={onRadioChange}
          />
        </Form.Field>
        <Form.Input
          icon={{ name: 'search', circular: true, link: true }}
          value={search}
          placeholder="Search ..."
          onChange={onSearchChange}
        />
      </Form>
    </>
  );
}
