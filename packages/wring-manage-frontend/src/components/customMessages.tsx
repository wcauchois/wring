import React, { ReactNode } from 'react';
import { Icon, Message, MessageProps } from 'semantic-ui-react';

interface CustomMessageProps {
  children: ReactNode;
  size?: MessageProps['size'];
}

export function SuccessMessage(props: CustomMessageProps) {
  const { children, ...messageProps } = props;
  return (
    <Message success {...messageProps}>
      <Icon name="check" />
      {children}
    </Message>
  );
}

export function FailureMessage(props: CustomMessageProps) {
  const { children, ...messageProps } = props;
  return (
    <Message error {...messageProps}>
      <Icon name="times" />
      {children}
    </Message>
  );
}

export function ConfirmationMessage(props: CustomMessageProps) {
  const { children, ...messageProps } = props;
  return (
    <Message color="blue" {...messageProps}>
      <Icon name="check circle" />
      {children}
    </Message>
  );
}

export function InformationMessage(props: CustomMessageProps) {
  const { children, ...messageProps } = props;
  return (
    <Message color="grey" {...messageProps}>
      <Icon name="info" />
      {children}
    </Message>
  );
}

export function WarningMessage(props: CustomMessageProps) {
  const { children, ...messageProps } = props;
  return (
    <Message warning {...messageProps}>
      <Icon name="warning sign" />
      {children}
    </Message>
  );
}
