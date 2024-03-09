import { useTastingContext } from 'pages/tastings/form-context'
import { getLabel } from 'helpers'

import {
  ALCOHOL_MARKS,
  BODY_MARKS,
  SWEET_MARKS,
  TANNIN_ACIDITY_MARKS,
} from 'components/form-tasting/form-tasting.constants'
import { Box, Slider, Text } from '@mantine/core'
import styles from 'components/form-steps/form-steps.module.css'
export const Taste = () => {
  const form = useTastingContext()

  return (
    <Box>
      <Text className={styles['form-label']}>Body</Text>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles['mark-label'],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={BODY_MARKS}
        label={getLabel('BODY', form.values.body)}
        {...form.getInputProps('body')}
      />

      <Text className={styles['form-label']}>Tannin</Text>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles['mark-label'],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel('TANNIN', form.values.tannin)}
        {...form.getInputProps('tannin')}
      />

      <Text className={styles['form-label']}>Acidity</Text>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles['mark-label'],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={TANNIN_ACIDITY_MARKS}
        label={getLabel('ACIDITY', form.values.acidity)}
        {...form.getInputProps('acidity')}
      />

      <Text className={styles['form-label']}>Alcohol(%)</Text>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles['mark-label'],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={ALCOHOL_MARKS}
        label={getLabel('ALCOHOL', form.values.alcohol)}
        {...form.getInputProps('alcohol')}
      />

      <Text className={styles['form-label']}>Sweetness</Text>
      <Slider
        classNames={{
          root: styles.slider,
          markLabel: styles['mark-label'],
        }}
        showLabelOnHover={false}
        max={5}
        min={1}
        step={1}
        marks={SWEET_MARKS}
        label={getLabel('SWEET', form.values.sweet)}
        {...form.getInputProps('sweet')}
      />
    </Box>
  )
}
