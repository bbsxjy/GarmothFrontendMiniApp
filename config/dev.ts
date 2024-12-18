import type { UserConfigExport } from '@tarojs/cli'

export default {
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {

  },
  plugins: ['@tarojs/plugin-mock'],
} satisfies UserConfigExport
