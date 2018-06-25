import React from 'react';
import Button from 'components/Button';

export default function SubmitButton({
  children,
  ...props
}: {
  children: any,
}) {
  return (
    <Button {...props} type="submit">
      {children}
    </Button>
  );
}
