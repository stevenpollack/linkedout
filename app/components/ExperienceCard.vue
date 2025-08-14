<template>
  <ul class="list">
    <li v-for="experience in Experience" :key="experience.company" class="list-row">
      <div class="list-row-content">
        <div>
          {{ experience.title }}
        </div>
        <div>
          {{ experience.company }} · {{ experience.type }}
        </div>
        <div>
          {{ experience.startDate }} -- {{ experience.endDate }}
        </div>
        <div>
          {{ experience.location }} · {{ experience.locationType }}
        </div>
        <div />
        <div>
          {{ experience.description }}
        </div>

        <div>
          {{ experience.skills }}
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import Experience from '~/content/frank-voltaire/experience.json'
</script>
