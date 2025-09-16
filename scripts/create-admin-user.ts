import connectDB from '../lib/mongodb'
import { User } from '../lib/models/User'

async function createAdminUser() {
  try {
    await connectDB()
    console.log('Connected to database')

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email)
      return
    }

    // Create admin user
    const adminUser = new User({
      name: 'مدير النظام',
      email: '25_project@raf-advanced.sa',
      password: '25Project@raf', // This will be hashed automatically
      role: 'admin',
      isActive: true
    })

    await adminUser.save()
    console.log('Admin user created successfully:')
    console.log('Email:', adminUser.email)
    console.log('Password: 25Project@raf')
    console.log('Role:', adminUser.role)
    console.log('\n⚠️  Please change the default password after first login!')

  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    process.exit(0)
  }
}

createAdminUser()
