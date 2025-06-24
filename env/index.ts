import { InferType, yup } from '@/lib/yup'

const envSchema = yup.object({
  GITHUB_ID: yup.string().required(),
  GITHUB_SECRET: yup.string().required(),
})

let env: InferType<typeof envSchema>

try {
  env = await envSchema.validate(process.env, { abortEarly: false })
} catch (error) {
  console.error('Invalid environment variables', error)
  throw new Error('Invalid environment variables.')
}

export { env }
