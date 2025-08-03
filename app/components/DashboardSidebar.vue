<script setup lang="ts">
const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'lucide:layout-dashboard',
  },
  {
    title: 'Home',
    url: '/',
    icon: 'lucide:home',
  },
]

const { user } = useAuth()

const route = useRoute()
function isRouteActive(url: string) {
  if (url === '/dashboard') {
    return route.path === '/dashboard' || route.path === '/dashboard/index'
  }

  return route.path === url || (route.path.startsWith(url) && route.path.charAt(url.length) === '/')
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            :as-child="true"
            class="w-full group-data-[collapsible=icon]:justify-center"
          >
            <NuxtLink to="/dashboard">
              <div class="flex items-center gap-2">
                <Icon
                  name="lucide:gallery-vertical-end"
                  size="20"
                />
                <h1 class="text-xl font-medium group-data-[collapsible=icon]:hidden">
                  NuxtRun
                </h1>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem
            v-for="item in items"
            :key="item.title"
          >
            <SidebarMenuButton
              as-child
              :tooltip="item.title"
              :is-active="isRouteActive(item.url)"
            >
              <NuxtLink :to="item.url">
                <Icon
                  :name="item.icon"
                  size="18"
                />
                <span class="group-data-[collapsible=icon]:hidden">{{ item.title }}</span>
              </NuxtLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <NavUser
        v-if="user"
        :user="user"
      />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
