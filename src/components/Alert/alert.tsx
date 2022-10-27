import React from "react";
import classNames from "classnames";

export enum AlertType {
  Success = "success",
  Default = "default",
  Danger = "danger",
  Warning = "warning",
}

export interface AlertProps {
  className?: string;
  alertType?: AlertType;
  title: string;
  description?: string;
  closable?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className, alertType, title, description, closable, onClose } = props;
  const classes = classNames("alert", className, {
    [`alert-${alertType}`]: alertType,
  });
  return (
    <div className={classes}>
      <div className="alert-title">{title}</div>
      {description && <div className="alert-description">{description}</div>}
      {closable && (
        <button className="alert-close" onClick={onClose}>
          <span className="alert-close-x">x</span>
        </button>
      )}
    </div>
  );
};

Alert.defaultProps = {
  alertType: AlertType.Default,
  closable: true,
};

export default Alert;