<script setup lang="ts">
import { ref } from 'vue'
import Editor from '../components/markdown/Editor.vue'
import Preview from '../components/markdown/Preview.vue'

const markdownContent = ref(`# Bienvenue dans l'éditeur Markdown!

## Fonctionnalités

- Support de la syntaxe Markdown
- Prévisualisation en temps réel
- Interface simple et intuitive

## Comment utiliser

1. Écrivez votre texte dans l'éditeur à gauche
2. Visualisez le résultat en temps réel à droite
3. Profitez des fonctionnalités Markdown!

\`\`\`js
// Exemple de code
console.log('Hello, Markdown!');
\`\`\`

> N'hésitez pas à explorer toutes les possibilités!
`)
</script>

<template>
  <div class="space-y-4">
    <h1 class="text-3xl font-bold text-center text-purple-400">Markdown Previewer</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100vh-12rem)]">
      <Editor v-model="markdownContent" />
      <Preview :content="markdownContent" />
    </div>
  </div>
</template>