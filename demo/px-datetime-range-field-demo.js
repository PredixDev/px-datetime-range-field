/*
Copyright (c) 2018, General Electric

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/* Common imports */
/* Common demo imports */
/* Imports for this component */
/* Demo DOM module */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'px-demo/px-demo-header.js';
import 'px-demo/px-demo-api-viewer.js';
import 'px-demo/px-demo-footer.js';
import 'px-demo/px-demo-configs.js';
import 'px-demo/px-demo-props.js';
import 'px-demo/px-demo-interactive.js';
import 'px-demo/px-demo-component-snippet.js';
import 'px-demo/px-demo-code-editor.js';
import '../px-datetime-range-field.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
  _template: html`
    <!-- Header -->
    <px-demo-header module-name="px-datetime-range-field" description="The px-datetime-range-field component includes various elements used for structuring responsive layouts.
        This component allows the user to select a date and time range precisely to the second or millisecond.
        This counter represents when the px-datetime-range-field event/range property of the
        range fields are being fired/updated. The behavior depends on whether the range field uses
        buttons. If it has buttons, then it is fired when the user clicks the apply button AND the date/time is valid.
        If it doesn't have buttons, then it is fired every time a valid change is made to the date or time." desktop="">
    </px-demo-header>

    <!-- Interactive -->
    <px-demo-interactive>
      <!-- Configs -->
      <px-demo-configs slot="px-demo-configs" configs="[[configs]]" props="{{props}}" chosen-config="{{consenConfig}}"></px-demo-configs>

      <!-- Props -->
      <px-demo-props slot="px-demo-props" props="{{props}}" config="[[chosenConfig]]"></px-demo-props>

      <!-- Code Editor -->
      <px-demo-code-editor slot="px-demo-code-editor" props="{{props}}"></px-demo-code-editor>

      <!-- Component ---------------------------------------------------------->
      <px-demo-component slot="px-demo-component">
        <p class="u-mb0">Event fired: <strong>px-datetime-range-submitted</strong></p>
        <p class="zeta u-mt0">See API Reference below for more details</p>
        <p class="u-mb++">Submitted range: <strong>{{props.fromMoment.value}}</strong> To: <strong>{{props.toMoment.value}}</strong></p>

        <px-datetime-range-field from-moment="{{props.fromMoment.value}}" to-moment="{{props.toMoment.value}}" date-format="{{props.dateFormat.value}}" time-format="{{props.timeFormat.value}}" show-buttons="{{props.showButtons.value}}" block-future-dates="{{props.blockFutureDates.value}}" block-past-dates="{{props.blockPastDates.value}}" hide-time="{{props.hideTime.value}}" hide-date="{{props.hideDate.value}}" hide-icon="{{props.hideIcon.value}}" allow-wrap="{{props.allowWrap.value}}" full-width="{{props.fullWidth.value}}" show-time-zone="{{props.showTimeZone.value}}" show-field-titles="{{props.showFieldTitles.value}}" is-valid="{{props.isValid.value}}" time-zone="{{props.timeZone.value}}" min-date="{{props.minDate.value}}" max-date="{{props.maxDate.value}}" required="{{props.required.value}}">
        </px-datetime-range-field>
      </px-demo-component>
      <!-- END Component ------------------------------------------------------>

      <px-demo-component-snippet slot="px-demo-component-snippet" element-properties="{{props}}" element-name="px-datetime-range-field" links-includes="[[linksIncludes]]" suppress-property-values="[[suppressPropertyValues]]">
      </px-demo-component-snippet>
    </px-demo-interactive>

    <!-- API Viewer -->
    <px-demo-api-viewer source="px-datetime-range-field"></px-demo-api-viewer>

    <!-- Footer -->
    <px-demo-footer></px-demo-footer>
`,

  is: 'px-datetime-range-field-demo',

  properties: {

    /**
     * Note: The actual data/values for `props` are placed in `this.demoProps`
     * to create a static reference that Polymer shouldn't overwrite.
     *
     * On object containing all the properties the user can configure for this
     * demo. Usually a pretty similar copy of the component's `properties` block
     * with some additional sugar added to describe what kind of input the
     * user will be shown and how that input should be configured.
     *
     * Note that `value` for each property is the default that will be set
     * unless a config from `configs` is applied by default.
     *
     *
     * @property demoProps
     * @type {Object}
     */
    props: {
      type: Object,
      value: function(){
        var props =  this.demoProps;
            props.timeZone.inputLocalCandidates = Px.moment.tz.names();
          return props;
        }
    },
    suppressPropertyValues: {
      type: Array,
      value: function() { return ['toMoment', 'fromMoment']; }
    },

    /**
     * An array of pre-configured `props` that can be used to provide the user
     * with a set of common examples. These configs will be made available
     * as a set of tabs the user can click that will automatically change
     * the `props` to specific values.
     *
     * @property demoProps
     * @type {Array}
     */
    configs: {
      type: Array,
      value: function(){
        return [
          { configName: "International",
            configReset: true },

          { configName: "Date Range",
            dateFormat: "MM/DD/YY",
            showButtons: false,
            blockPastDates: false,
            blockFutureDates: true,
            hideTime: true,
            hideDate: false,
            hideIcon: false,
            allowWrap: true,
            showTimeZone: "extendedDropdown",
            timeZone: "America/Los_Angeles",
            fromMoment: Px.moment().subtract(8, 'day').startOf('day'),
            toMoment: Px.moment().subtract(1, 'day').startOf('day'),
          },

          { configName: "Time Range",
            timeFormat: "HH:mm:ss.SSS",
            showButtons: false,
            blockPastDates: false,
            blockFutureDates: false,
            hideTime: false,
            hideDate: true,
            hideIcon: false,
            allowWrap: false,
            showTimeZone: "text",
            timeZone: "UTC",
            fromMoment: Px.moment().subtract(8, 'day').startOf('day'),
            toMoment: Px.moment().subtract(1, 'day').startOf('day')
          }
        ]
      }
    }
  },

  /**
   * A reference for `this.props`. Read the documentation there.
   */
  demoProps: {

    hideTime: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    hideDate: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    hideIcon: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    required: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    showButtons: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    allowWrap: {
      type: Boolean,
      defaultValue: true,
      inputType: 'toggle'
    },

    fullWidth: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    showFieldTitles: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    blockFutureDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    blockPastDates: {
      type: Boolean,
      defaultValue: false,
      inputType: 'toggle'
    },

    dateFormat: {
      type: String,
      defaultValue: 'YYYY/MM/DD',
      inputType: 'text',
      inputPlaceholder: 'YYYY/MM/DD'
    },

    timeFormat: {
      type: String,
      defaultValue: 'HH:mm:ss',
      inputType: 'text',
      inputPlaceholder: 'HH:mm:ss'
    },

    timeZone: {
      type: String,
      defaultValue: 'UTC',
      inputType: 'typeahead',
      inputPlaceholder: 'UTC'
    },

    showTimeZone: {
      type: String,
      defaultValue: 'abbreviatedText',
      inputType: 'dropdown',
      inputChoices: ['none', 'dropdown', 'extendedDropdown', 'text', 'abbreviatedText']
    },

    minDate: {
      type: String,
      defaultValue: Px.moment().subtract(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

    maxDate: {
      type: String,
      defaultValue: Px.moment().add(3, 'month').toISOString(),
      inputType: 'text',
      inputPlaceholder: 'ISOString'
    },

    fromMoment: {
      type: Object,
      defaultValue: null
    },

    toMoment: {
      type: Object,
      defaultValue: null
    }

  },

  ready: function () {
    this.linksIncludes = ['px-datetime-common/px-polygit-imports-datetime.html'];
  }
});
