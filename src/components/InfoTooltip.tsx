import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { IInfoTooltip } from "types";

const InfoTooltip = ({ message }: IInfoTooltip) => {
  return (
    <Tooltip title={message}>
      <InfoCircleOutlined size={20} className="color-primary" />
    </Tooltip>
  );
};

export default InfoTooltip;
