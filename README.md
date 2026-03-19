# jbrowse-plugin-apollo-attributes

A JBrowse 2 plugin that adds curated attribute editing to [Apollo](https://github.com/GMOD/Apollo3). It provides a guided interface for adding controlled-vocabulary attributes to gene annotations, reducing errors and improving consistency across curators.

## Features

- **Controlled vocabulary** for `curator_notes`: a dropdown of standard curation statements plus a free-text fallback
- **Free-text field** for `source_alignment`: accepts alignment/protein IDs as evidence
- **Config-driven**: keys and preset values are defined in `curation-config.json` — no rebuild needed to add new keys or values
- Registers keys as Apollo reserved attributes so they appear prominently in the Attributes tab

## Required Attributes

These attributes are required by curation protocol:

| Key | Type | Notes |
|-----|------|-------|
| `curator_notes` | select + free text | Describe the curation action taken |
| `source_alignment` | free text | ID(s) of the evidence alignment or protein used |

## Deployment

Build the plugin and deploy using [apollo-tools](https://github.com/simrbase/apollo-tools):

```bash
cd /data/src/jbrowse-plugin-apollo-attributes
CYPRESS_INSTALL_BINARY=0 yarn
yarn build

# Deploy to all Apollo instances
cd /var/www/html
apollo-add-plugin /data/src/jbrowse-plugin-apollo-attributes
```

The script copies the built JS and `curation-config.json` to each instance's web directory and registers the plugin in `*-config.json`.

## Customizing Keys and Values

Edit `curation-config.json` in each instance's web directory (e.g. `/var/www/html/chacal/curation-config.json`) or update the source file at the plugin root and re-run `apollo-add-plugin`. **No rebuild required.**

```json
{
  "attributes": [
    {
      "key": "curator_notes",
      "label": "Curator Notes",
      "type": "select+free",
      "values": [
        "curator added new gene based on src_alignment",
        "curator assigned new name based on community name usage"
      ]
    },
    {
      "key": "source_alignment",
      "label": "Source Alignment",
      "type": "free",
      "placeholder": "e.g. KC_Nvec200_v1.4309.8.p1, XP_032220222.1"
    }
  ]
}
```

### Attribute types

| `type` | Behavior |
|--------|----------|
| `select+free` | Dropdown of preset `values` + free-text fallback |
| `free` | Plain text input (optional `placeholder`) |

## Development

Requires Node.js ≥ 18 and Yarn 4.

```bash
CYPRESS_INSTALL_BINARY=0 yarn     # install deps
yarn build                        # production build → dist/
yarn start                        # dev server with watch
```

> **Note:** `.yarnrc.yml` must set `nodeLinker: node-modules` — Yarn PnP is incompatible with rollup on this server.

## License

MIT
