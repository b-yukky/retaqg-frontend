<script setup lang="ts">
import { isEmptyArray, isNullOrUndefined } from '@/@core/utils'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const toLoginPage = () => {
  if (isNullOrUndefined(user.value))
    router.replace('/login')
}

const logout = () => {
  authStore.logout()
  router.replace('/evaluate')
}

</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    :color="user ? 'success' : 'error'"
    @click="toLoginPage"
    
  >
    <v-chip
      link
      label
      :color="user ? 'primary': 'default'"
      
    >{{ user ? user.username || user.uuid : 'Login' }}

      <!-- SECTION Menu -->
      <VMenu
        v-if="!isNullOrUndefined(user)"
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 user Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ user.username || user.uuid }}
            </VListItemTitle>
            <VListItemSubtitle v-if="!isEmptyArray(user.groups)"> {{ user.groups  }}</VListItemSubtitle>
          </VListItem>
          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link disabled>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-account-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

          <!-- 👉 Settings -->
          <VListItem link disabled>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-cog-outline"
                size="22"
              />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </v-chip>
  </VBadge>
</template>
