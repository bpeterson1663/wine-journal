import { Flex, Radio, Group, Textarea } from '@mantine/core'
import { useFormContext, useWatch } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'features/hooks'
import { ColorT, TastingT } from 'types'
import ColorPalette from 'components/color-palette/color-palette.component'

export const ColorSmell = () => {
  const location = useLocation()
  const { setValue, control } = useFormContext<TastingT>()
  const { editTasting } = useAppSelector(state => state.tasting)

  const color = useWatch({
    control,
    name: 'color',
    defaultValue: location.pathname === '/tastings/edit' && editTasting ? editTasting.color : 'red'
  })
  const hue = useWatch({
    control,
    name: 'hue'
  })
  const intensity = useWatch({
    control,
    name: 'intensity'
  })

  return (
    <Flex
      direction="column"
      wrap="wrap"
      maw={ 600 }
    >
      <Radio.Group
        name="color"
        label="Color"
        defaultValue="red"
        onChange={ val => {
          if (val === 'red') setValue('hue', 'purple')
          else if (val === 'white') setValue('hue', 'straw')
          else if (val === 'rose') setValue('hue', 'pink')
          setValue('color', val as ColorT)
        } }
      >
        <Group mt="xs">
          <Radio value="red" label="Red" />
          <Radio value="white" label="White" />
          <Radio value="rose" label="Rosé" />
        </Group>
      </Radio.Group>

      <Radio.Group
        name="intensity"
        label="Intensity"
        defaultValue="pale"
      >
        <Group mt="xs">
          <Radio value="pale" label="Pale" />
          <Radio value="medium" label="Medium" />
          <Radio value="deep" label="Deep" />
        </Group>
      </Radio.Group>

      { color === 'red' && (
         <Radio.Group
          name="hue"
          label="Hue"
          defaultValue="purple"
        >
         <Group mt="xs">
           <Radio value="purple" label="Purple" />
           <Radio value="ruby" label="Ruby" />
           <Radio value="garnet" label="Garnet" />
           <Radio value="tawny" label="Tawny" />
           <Radio value="brown" label="Brown" />
         </Group>
        </Radio.Group>
      ) }
      { color === 'white' && (
        <Radio.Group
          name="hue"
          label="Hue"
          defaultValue="straw"
        >
          <Group mt="xs">
            <Radio value="straw" label="Straw" />
            <Radio value="yellow" label="Yellow" />
            <Radio value="gold" label="Gold" />
            <Radio value="amber" label="Amber" />
            <Radio value="brown" label="Brown" />
          </Group>
        </Radio.Group>
      ) }
      { color === 'rose' && (
        <Radio.Group
          name="hue"
          label="Hue"
          defaultValue="pink"
        >
          <Group mt="xs">
            <Radio value="pink" label="Pink" />
            <Radio value="salmon" label="Salmon" />
            <Radio value="copper" label="Copper" />
          </Group>
        </Radio.Group>
      ) }
      <ColorPalette color={ color } hue={ hue } intensity={ intensity } />

      <Textarea
        multiline
        rows={ 4 }
        name="smell"
        label="Smell"
        variant="outlined"
      />

    </Flex>
  )
}
