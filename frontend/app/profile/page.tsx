'use client'

import { useEffect } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin } from 'lucide-react'

export default function ProfilePage() {
  const { token, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !token) {
      router.push('/')
    }
  }, [token, isLoading, router])

  if (isLoading) {
    return (
      <DashboardLayout currentPage="profile">
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout currentPage="profile">
      <div className="space-y-6 max-w-2xl">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input
                type="text"
                defaultValue={user?.name}
                disabled
                className="bg-white"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Contact support to change your name
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  defaultValue={user?.email}
                  disabled
                  className="bg-white"
                />
                <Button variant="outline" className="border-border">
                  Change
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <Button variant="outline" className="gap-2 border-border">
                Change Password
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Store Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Store Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Name
              </label>
              <Input
                type="text"
                placeholder="Your Kirana Store"
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Store Address
              </label>
              <Input
                type="text"
                placeholder="123 Main Street, City, State"
                className="bg-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91-xxxxxxxxxx"
                  className="bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  GST Number
                </label>
                <Input
                  type="text"
                  placeholder="27AAPCU1234A1Z5"
                  className="bg-white"
                />
              </div>
            </div>

            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-foreground">Email Notifications</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border pt-4">
              <span className="text-foreground">Low Stock Alerts</span>
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
            </div>
            <div className="flex items-center justify-between py-2 border-t border-border pt-4">
              <span className="text-foreground">Daily Reports</span>
              <input type="checkbox" className="w-4 h-4 rounded" />
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              These actions cannot be undone. Please proceed with caution.
            </p>
            <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50 w-full">
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
