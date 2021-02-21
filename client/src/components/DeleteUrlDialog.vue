<template>
  <v-dialog
    :persistent="form.isLoading"
    no-click-animation
    v-model="internalValue"
    width="500"
  >
    <v-form @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>
          Delete URL
        </v-card-title>

        <v-card-text>
          <p>
            Enter the authorization code below to delete the url with slug
            <code>{{ item.slug }}</code>
          </p>
          <v-text-field
            label="Code"
            v-model="form.code"
            persistent-hint
            hint="Code is needed for authorization."
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-btn
            :loading="form.isLoading"
            depressed
            color="error"
            type="submit"
            block
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    item: Object
  },

  data: () => ({
    form: {
      code: null,
      isLoading: false
    }
  }),

  computed: {
    internalValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },

  methods: {
    async onSubmit() {
      this.form.isLoading = true;

      try {
        await this.$store.dispatch("deleteUrl", {
          id: this.item._id,
          code: this.form.code
        });
      } finally {
        this.internalValue = false;

        this.form = {
          isLoading: false,
          code: null
        };
      }
    }
  }
};
</script>

<style>
</style>