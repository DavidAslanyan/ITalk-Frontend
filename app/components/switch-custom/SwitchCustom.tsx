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
      className="group data-[checked]:border-[0.2rem] border-secondary  inline-flex h-[1.8rem] w-14 items-center rounded-full bg-secondary transition data-[checked]:bg-primary"
    >
      <span className="border-[0.1rem] border-thirdly size-5 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-7" />
    </Switch>
  )
}

export default SwitchCustom;

