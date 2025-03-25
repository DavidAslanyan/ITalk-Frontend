"use client"
import { Switch } from '@headlessui/react'
import React from 'react'

type SwitchProps = {
  enabled: boolean;
  setEnabled: (arg: boolean) => void;
}

const SwitchCustom: React.FC<SwitchProps> = ({
  enabled,
  setEnabled
}) => {
  return (
    <Switch
      checked={enabled}
      onChange={() => setEnabled(!enabled)}
      className="group inline-flex h-[1.78rem] w-14 items-center rounded-full bg-secondary transition data-[checked]:bg-primary"
    >
      <span className="size-5 translate-x-[0.2rem] rounded-full bg-white transition group-data-[checked]:translate-x-[2rem]" />
    </Switch>
  )
}

export default SwitchCustom;

