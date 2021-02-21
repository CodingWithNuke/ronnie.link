<template>
  <v-dialog :persistent="form.isLoading" no-click-animation width="500">
    <template #activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs"></slot>
    </template>

    <v-form @submit.prevent="createURL">
      <v-card>
        <v-card-title>
          Create a new URL
        </v-card-title>

        <v-card-text>
          <v-text-field label="URL" v-model="form.url" />
          <v-text-field label="Slug" v-model="form.slug" />
          <v-text-field
            label="Code"
            v-model="form.code"
            persistent-hint
            hint="Code is needed for authorization."
          />
        </v-card-text>

        <v-card-actions>
          <v-btn
            type="submit"
            :loading="form.isLoading"
            block
            depressed
            color="primary"
            dark
          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    form: {
      url: null,
      slug: null,
      isLoading: false
    }
  }),

  methods: {
    async createURL() {
      this.form.isLoading = true;

      try {
        await this.$store.dispatch("createUrl", {
          url: this.form.url,
          slug: this.form.slug,
          code: this.form.code
        });
      } finally {
        this.form = {
          ...this.form,
          isLoading: false,
          url: null,
          slug: null
        };
        this.showCreateDialog = false;
      }
    }
  }
};
</script>

<style>
</style>