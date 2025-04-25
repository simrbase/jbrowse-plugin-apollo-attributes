import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import { version } from '../package.json'

import { CustomAttributeEditor } from './CustomAttributeEditor'
import { CustomAttributeViewer } from './CustomAttributeViewer'

export default class ApolloFeatureStatusPlugin extends Plugin {
  name = 'ApolloFeatureStatusPlugin'
  version = version

  install(pluginManager: PluginManager) {
    pluginManager.addToExtensionPoint(
      'Apollo-ReservedAttributeKeys',
      (arg: Record<string, string | undefined>) => {
        arg.Status = 'status'
        return arg
      },
    )

    pluginManager.addToExtensionPoint(
      'Apollo-AttributeEditorComponent',
      (arg: React.ElementType, props) => {
        if (props.key === 'status') {
          return CustomAttributeEditor
        }
        return arg
      },
    )

    pluginManager.addToExtensionPoint(
      'Apollo-AttributeViewerComponent',
      (arg: React.ElementType, props) => {
        if (props.key === 'status') {
          return CustomAttributeViewer
        }
        return arg
      },
    )
  }
}
