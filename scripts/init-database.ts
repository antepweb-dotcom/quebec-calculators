import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Initializing database...')

  // Create default site config
  const config = await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      isAdsEnabled: false,
      adSenseId: '',
      bannerSlotId: '',
      alertMessage: 'Welcome to our site!',
      isAlertActive: false
    }
  })

  console.log('✅ Site config created:', config)

  // Add some sample analytics data
  const samplePaths = [
    '/calcul-hypotheque',
    '/salaire-net-quebec',
    '/tps-tvq-quebec',
    '/capacite-emprunt',
    '/pret-auto'
  ]

  for (const path of samplePaths) {
    await prisma.analytics.create({
      data: { path }
    })
  }

  console.log('✅ Sample analytics data created')
  console.log('🎉 Database initialization complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
