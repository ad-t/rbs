import * as React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { Show } from 'src/shared/types';

interface ShowNightSelectorProps {
  onChange: (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
  showId: string;
  shows: Show[];
}

export function ShowNightSelector({
  onChange,
  showId,
  shows,
}: ShowNightSelectorProps) {
  const nights = React.useMemo(
    () =>
      shows.map((show, index) => ({
        key: show.id,
        text: `Night ${index + 1} - ${new Date(show.time).toLocaleString()}`,
        value: show.id,
      })),
    [shows]
  );

  return (
    <>
      <p>Select show:</p>
      <div style={{ marginBottom: '1rem' }}>
        <Dropdown
          placeholder="Select show night"
          selection
          options={nights}
          value={showId}
          onChange={onChange}
        />
      </div>
    </>
  );
}
