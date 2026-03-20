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

### 1. Build

```bash
git clone https://github.com/simrbase/jbrowse-plugin-apollo-attributes
cd jbrowse-plugin-apollo-attributes
yarn install
yarn build
```

### 2. Copy files to your JBrowse web directory

Copy the built JS and the config file:

```bash
cp dist/jbrowse-plugin-apollo-attributes.umd.development.js /path/to/jbrowse/
cp curation-config.json /path/to/jbrowse/
```

### 3. Register in JBrowse config

Add the plugin to your `config.json`:

```json
{
  "plugins": [
    {
      "name": "ApolloAttributes",
      "umdLoc": {
        "uri": "jbrowse-plugin-apollo-attributes.umd.development.js"
      }
    }
  ]
}
```

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
yarn install    # install deps
yarn build      # production build → dist/
yarn start      # dev server with watch
```

## License

MIT
