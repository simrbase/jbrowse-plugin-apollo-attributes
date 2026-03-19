import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import React from 'react'

import { version } from '../package.json'
import { CurationAttributeEditor } from './CurationAttributeEditor'
import { CurationAttributeViewer } from './CurationAttributeViewer'
import {
  getCurationConfig,
  loadCurationConfig,
} from './CurationConfigLoader'

export default class ApolloAttributesPlugin extends Plugin {
  name = 'ApolloAttributesPlugin'
  version = version

  install(pluginManager: PluginManager) {
    // Kick off config fetch at install time; result is cached
    void loadCurationConfig()

    pluginManager.addToExtensionPoint(
      'Apollo-ReservedAttributeKeys',
      (arg: Record<string, string | undefined>) => {
        const config = getCurationConfig()
        const attrs = config?.attributes ?? [
          { key: 'curator_notes', label: 'Curator Notes' },
          { key: 'source_alignment', label: 'Source Alignment' },
        ]
        for (const attr of attrs) {
          arg[attr.label] = attr.key
        }
        return arg
      },
    )

    pluginManager.addToExtensionPoint(
      'Apollo-AttributeEditorComponent',
      (arg: React.ElementType, props: { key?: string }) => {
        const config = getCurationConfig()
        if (!config) return arg
        const attrConfig = config.attributes.find(a => a.key === props.key)
        if (!attrConfig) return arg
        const capturedConfig = attrConfig
        return function CurationAttributeEditorWrapper(editorProps: {
          attributeValues?: string[]
          setAttribute: (newAttribute?: string[]) => void
          isNew?: boolean
        }) {
          return React.createElement(CurationAttributeEditor, {
            ...editorProps,
            attributeConfig: capturedConfig,
          })
        }
      },
    )

    pluginManager.addToExtensionPoint(
      'Apollo-AttributeViewerComponent',
      (arg: React.ElementType, props: { key?: string }) => {
        const config = getCurationConfig()
        if (!config) return arg
        const attrConfig = config.attributes.find(a => a.key === props.key)
        if (!attrConfig) return arg
        return CurationAttributeViewer
      },
    )
  }
}
