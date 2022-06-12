type Resource = {
  resourceId: string
  name: string
  impacts: [
    {
      impactGWP100_kgCO2e: number
      impactAP_kgSO2e: number
    },
  ]
}

type Formula = {
  calculationRuleId: string
  name: string
  multiplyFormula: string[]
}

export type Data = {
  resources: Resource[]
  calculationRules: Formula[]
}
