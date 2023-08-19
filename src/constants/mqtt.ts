export const mqttConstants = {
  clientId: "emqx_react_nyampasu",
  username: "emqx_test",
  password: "emqx_test",
  topic: "tracking/nyam",
};

export const instructOptions = [
  { value: "move_forward_command", label: "Forward" },
  { value: "move_backward_command", label: "Backward" },
  { value: "move_left_command", label: "Left" },
  { value: "move_right_command", label: "Right" },
  { value: "stop_command", label: "Stop" },
];
