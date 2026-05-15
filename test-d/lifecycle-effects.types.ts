import { useCycleEffect } from '../registry/default/lifecycle-effects/use-cycle-effect'
import { useInitialEffect } from '../registry/default/lifecycle-effects/use-initial-effect'
import { useRenderEffect } from '../registry/default/lifecycle-effects/use-render-effect'
import { useUnmountEffect } from '../registry/default/lifecycle-effects/use-unmount-effect'
import {
  useUpdateEffect,
  default as useUpdateEffectDefault,
} from '../registry/default/lifecycle-effects/use-update-effect'

const effect = () => undefined
const cleanupEffect = () => () => undefined

useInitialEffect(effect)
useInitialEffect(cleanupEffect)

useUpdateEffect(effect)
useUpdateEffect(effect, ['value'])
useUpdateEffect(cleanupEffect, ['value'])
useUpdateEffectDefault(effect, ['value'])
// @ts-expect-error - empty deps are mount-only; use useInitialEffect instead.
useUpdateEffect(effect, [])

useUnmountEffect(() => undefined)

useRenderEffect(effect)
useRenderEffect(effect, ['value'])
useRenderEffect(cleanupEffect, ['value'])
// @ts-expect-error - empty deps are mount-only; use useInitialEffect instead.
useRenderEffect(effect, [])

useCycleEffect(effect)
useCycleEffect(effect, [])
useCycleEffect(effect, ['value'])
