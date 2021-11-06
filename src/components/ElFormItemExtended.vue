<template>
  <el-form-item v-bind="$attrs" :label="label" :error='firstErrorMessage'>
    <slot/>
  </el-form-item>
</template>

<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

export default {
  name: 'el-form-item-extended',
  extends: singleErrorExtractorMixin,
  inheritAttrs: false,
};
</script>
