<script setup lang="ts">

</script>

<template>
  <SidebarProvider>
    <DashboardSidebar />
    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger />
        </div>
      </header>
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>
