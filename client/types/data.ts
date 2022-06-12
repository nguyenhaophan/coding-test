export type Data = {
  resources: [
    {
      resourceId: string
      name: string
      impacts: [
        {
          impactGWP100_kgCO2e: number
          impactAP_kgSO2e: number
        },
      ]
    },
  ]
  calculationRules: [
    {
      calculationRuleId: string
      name: string
      multiplyFormula: string[]
    },
  ]
}
