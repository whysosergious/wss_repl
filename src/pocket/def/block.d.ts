//? minimal restriction defs

// Nu has a json-to-schema script,
// a short rust script that is easily extendable
// experiment extending it in pocket
export enum BlockTrait {
  State = 1,
  Props = 2,
  Style = 3,
  Event = 4,
  Text = 5,
  Children = 20,
}

export type BlockBase = {
  iid: string
  name: string

  desc?: string
  is?: string
  traits?: Set<number>
}

// TODO: conditional props 2.0 e.g a 'value' prop added together with a 'State' trait if a block is == input.
export interface BuilderBlock extends BlockBase {
  state?: Record<string, any>
  props?: Record<string, any>
  style?: Record<string, any>
  event?: Record<string, any>
  text?: string | number
  children?: (string | BuilderBlock)[]
}
