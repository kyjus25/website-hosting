
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen$1(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = typeof node[prop] === 'boolean' && value === '' ? true : value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }
    class HtmlTag {
        constructor() {
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush$1);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush$1() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update$1(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update$1($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush$1();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.2' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen$1(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.44.2 */

    function create_fragment$A(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$A.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$A($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$A, create_fragment$A, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$A.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.44.2 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$6(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$2, create_else_block$6];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$6(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$6.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$z(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$z.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$z($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$z, create_fragment$z, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$z.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.44.2 */
    const file$u = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$y(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$u, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$y.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$y($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$y, create_fragment$y, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$y.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/partials/Header.svelte generated by Svelte v3.44.2 */
    const file$t = "src/partials/Header.svelte";

    // (8:8) <Link to="/">
    function create_default_slot_5$1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			attr_dev(img, "alt", window.TITLE);
    			if (!src_url_equal(img.src, img_src_value = "/assets/WebTv logo.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$t, 8, 10, 164);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5$1.name,
    		type: "slot",
    		source: "(8:8) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (21:8) <Link to="/">
    function create_default_slot_4$2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Home");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$2.name,
    		type: "slot",
    		source: "(21:8) <Link to=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (22:8) <Link to="/pages/news">
    function create_default_slot_3$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("News");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$3.name,
    		type: "slot",
    		source: "(22:8) <Link to=\\\"/pages/news\\\">",
    		ctx
    	});

    	return block;
    }

    // (23:8) <Link to="/pages/live">
    function create_default_slot_2$3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Live");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$3.name,
    		type: "slot",
    		source: "(23:8) <Link to=\\\"/pages/live\\\">",
    		ctx
    	});

    	return block;
    }

    // (24:8) <Link to="/pages/donate">
    function create_default_slot_1$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Dontate");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$4.name,
    		type: "slot",
    		source: "(24:8) <Link to=\\\"/pages/donate\\\">",
    		ctx
    	});

    	return block;
    }

    // (25:8) <Link to="/pages/contact">
    function create_default_slot$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Contact");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(25:8) <Link to=\\\"/pages/contact\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$x(ctx) {
    	let header;
    	let div2;
    	let div0;
    	let link0;
    	let t0;
    	let div1;
    	let input;
    	let t1;
    	let ul;
    	let li0;
    	let link1;
    	let t2;
    	let li1;
    	let link2;
    	let t3;
    	let li2;
    	let link3;
    	let t4;
    	let li3;
    	let link4;
    	let t5;
    	let li4;
    	let link5;
    	let current;

    	link0 = new Link$1({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_5$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$1({
    			props: {
    				to: "/",
    				$$slots: { default: [create_default_slot_4$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link$1({
    			props: {
    				to: "/pages/news",
    				$$slots: { default: [create_default_slot_3$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3 = new Link$1({
    			props: {
    				to: "/pages/live",
    				$$slots: { default: [create_default_slot_2$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link4 = new Link$1({
    			props: {
    				to: "/pages/donate",
    				$$slots: { default: [create_default_slot_1$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link5 = new Link$1({
    			props: {
    				to: "/pages/contact",
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			header = element("header");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			input = element("input");
    			t1 = space();
    			ul = element("ul");
    			li0 = element("li");
    			create_component(link1.$$.fragment);
    			t2 = space();
    			li1 = element("li");
    			create_component(link2.$$.fragment);
    			t3 = space();
    			li2 = element("li");
    			create_component(link3.$$.fragment);
    			t4 = space();
    			li3 = element("li");
    			create_component(link4.$$.fragment);
    			t5 = space();
    			li4 = element("li");
    			create_component(link5.$$.fragment);
    			attr_dev(div0, "id", "logo");
    			attr_dev(div0, "class", "flex-1");
    			add_location(div0, file$t, 6, 6, 101);
    			attr_dev(input, "placeholder", "Seach for a video or post...");
    			attr_dev(input, "type", "text");
    			input.value = "";
    			attr_dev(input, "name", "s");
    			attr_dev(input, "id", "s");
    			add_location(input, file$t, 13, 8, 270);
    			add_location(div1, file$t, 12, 6, 256);
    			attr_dev(div2, "class", "flex");
    			add_location(div2, file$t, 5, 4, 76);
    			add_location(header, file$t, 4, 0, 63);
    			add_location(li0, file$t, 20, 4, 429);
    			add_location(li1, file$t, 21, 4, 467);
    			add_location(li2, file$t, 22, 4, 515);
    			add_location(li3, file$t, 23, 4, 563);
    			add_location(li4, file$t, 24, 4, 616);
    			attr_dev(ul, "id", "navigation");
    			add_location(ul, file$t, 19, 2, 404);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div2);
    			append_dev(div2, div0);
    			mount_component(link0, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, input);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, ul, anchor);
    			append_dev(ul, li0);
    			mount_component(link1, li0, null);
    			append_dev(ul, t2);
    			append_dev(ul, li1);
    			mount_component(link2, li1, null);
    			append_dev(ul, t3);
    			append_dev(ul, li2);
    			mount_component(link3, li2, null);
    			append_dev(ul, t4);
    			append_dev(ul, li3);
    			mount_component(link4, li3, null);
    			append_dev(ul, t5);
    			append_dev(ul, li4);
    			mount_component(link5, li4, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);
    			const link4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link4_changes.$$scope = { dirty, ctx };
    			}

    			link4.$set(link4_changes);
    			const link5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link5_changes.$$scope = { dirty, ctx };
    			}

    			link5.$set(link5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			transition_in(link4.$$.fragment, local);
    			transition_in(link5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			transition_out(link4.$$.fragment, local);
    			transition_out(link5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(link0);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(ul);
    			destroy_component(link1);
    			destroy_component(link2);
    			destroy_component(link3);
    			destroy_component(link4);
    			destroy_component(link5);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$x.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$x($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Link: Link$1 });
    	return [];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$x, create_fragment$x, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$x.name
    		});
    	}
    }

    /* src/partials/Footer.svelte generated by Svelte v3.44.2 */
    const file$s = "src/partials/Footer.svelte";

    function create_fragment$w(ctx) {
    	let footer;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			footer.textContent = `Copyright ©${new Date().getFullYear()}  ${window.TITLE}`;
    			add_location(footer, file$s, 4, 0, 63);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$w.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$w($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Link: Link$1 });
    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$w, create_fragment$w, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$w.name
    		});
    	}
    }

    /* src/partials/Sidebar.svelte generated by Svelte v3.44.2 */
    const file$r = "src/partials/Sidebar.svelte";

    // (7:12) <Link to="/pages/about">
    function create_default_slot_3$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" About");
    			attr_dev(i, "class", "fas fa-address-card");
    			add_location(i, file$r, 6, 36, 116);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$2.name,
    		type: "slot",
    		source: "(7:12) <Link to=\\\"/pages/about\\\">",
    		ctx
    	});

    	return block;
    }

    // (8:12) <Link to="/pages/dontate">
    function create_default_slot_2$2(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Donate");
    			attr_dev(i, "class", "fas fa-hand-holding-usd");
    			add_location(i, file$r, 7, 38, 205);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$2.name,
    		type: "slot",
    		source: "(8:12) <Link to=\\\"/pages/dontate\\\">",
    		ctx
    	});

    	return block;
    }

    // (9:12) <Link to="/pages/contact">
    function create_default_slot_1$3(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text("Contact");
    			attr_dev(i, "class", "fas fa-envelope");
    			add_location(i, file$r, 8, 38, 299);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$3.name,
    		type: "slot",
    		source: "(9:12) <Link to=\\\"/pages/contact\\\">",
    		ctx
    	});

    	return block;
    }

    // (10:12) <Link to="/pages/mission">
    function create_default_slot$3(ctx) {
    	let i;
    	let t;

    	const block = {
    		c: function create() {
    			i = element("i");
    			t = text(" Our Mission");
    			attr_dev(i, "class", "fas fa-flag-checkered");
    			add_location(i, file$r, 9, 38, 385);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, i, anchor);
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(i);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(10:12) <Link to=\\\"/pages/mission\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$v(ctx) {
    	let aside;
    	let ul;
    	let li0;
    	let link0;
    	let t0;
    	let li1;
    	let link1;
    	let t1;
    	let li2;
    	let link2;
    	let t2;
    	let li3;
    	let link3;
    	let current;

    	link0 = new Link$1({
    			props: {
    				to: "/pages/about",
    				$$slots: { default: [create_default_slot_3$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link1 = new Link$1({
    			props: {
    				to: "/pages/dontate",
    				$$slots: { default: [create_default_slot_2$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link2 = new Link$1({
    			props: {
    				to: "/pages/contact",
    				$$slots: { default: [create_default_slot_1$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link3 = new Link$1({
    			props: {
    				to: "/pages/mission",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			aside = element("aside");
    			ul = element("ul");
    			li0 = element("li");
    			create_component(link0.$$.fragment);
    			t0 = space();
    			li1 = element("li");
    			create_component(link1.$$.fragment);
    			t1 = space();
    			li2 = element("li");
    			create_component(link2.$$.fragment);
    			t2 = space();
    			li3 = element("li");
    			create_component(link3.$$.fragment);
    			add_location(li0, file$r, 6, 8, 88);
    			add_location(li1, file$r, 7, 8, 175);
    			add_location(li2, file$r, 8, 8, 269);
    			add_location(li3, file$r, 9, 8, 355);
    			add_location(ul, file$r, 5, 4, 75);
    			add_location(aside, file$r, 4, 0, 63);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, aside, anchor);
    			append_dev(aside, ul);
    			append_dev(ul, li0);
    			mount_component(link0, li0, null);
    			append_dev(ul, t0);
    			append_dev(ul, li1);
    			mount_component(link1, li1, null);
    			append_dev(ul, t1);
    			append_dev(ul, li2);
    			mount_component(link2, li2, null);
    			append_dev(ul, t2);
    			append_dev(ul, li3);
    			mount_component(link3, li3, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const link0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link0_changes.$$scope = { dirty, ctx };
    			}

    			link0.$set(link0_changes);
    			const link1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link1_changes.$$scope = { dirty, ctx };
    			}

    			link1.$set(link1_changes);
    			const link2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link2_changes.$$scope = { dirty, ctx };
    			}

    			link2.$set(link2_changes);
    			const link3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				link3_changes.$$scope = { dirty, ctx };
    			}

    			link3.$set(link3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link0.$$.fragment, local);
    			transition_in(link1.$$.fragment, local);
    			transition_in(link2.$$.fragment, local);
    			transition_in(link3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link0.$$.fragment, local);
    			transition_out(link1.$$.fragment, local);
    			transition_out(link2.$$.fragment, local);
    			transition_out(link3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(aside);
    			destroy_component(link0);
    			destroy_component(link1);
    			destroy_component(link2);
    			destroy_component(link3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$v.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$v($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Sidebar', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Sidebar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Link: Link$1 });
    	return [];
    }

    class Sidebar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$v, create_fragment$v, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Sidebar",
    			options,
    			id: create_fragment$v.name
    		});
    	}
    }

    /* src/pages/Contact.svelte generated by Svelte v3.44.2 */

    const file$q = "src/pages/Contact.svelte";

    function create_fragment$u(ctx) {
    	let article;
    	let h1;
    	let t1;
    	let input0;
    	let br0;
    	let t2;
    	let input1;
    	let br1;
    	let t3;
    	let textarea;
    	let br2;
    	let t4;
    	let button;

    	const block = {
    		c: function create() {
    			article = element("article");
    			h1 = element("h1");
    			h1.textContent = "Contact Us";
    			t1 = space();
    			input0 = element("input");
    			br0 = element("br");
    			t2 = space();
    			input1 = element("input");
    			br1 = element("br");
    			t3 = space();
    			textarea = element("textarea");
    			br2 = element("br");
    			t4 = space();
    			button = element("button");
    			button.textContent = "Send Message";
    			add_location(h1, file$q, 1, 2, 12);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "placeholder", "Name");
    			add_location(input0, file$q, 2, 2, 34);
    			add_location(br0, file$q, 2, 40, 72);
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "placeholder", "Email");
    			add_location(input1, file$q, 3, 2, 79);
    			add_location(br1, file$q, 3, 41, 118);
    			attr_dev(textarea, "rows", "5");
    			attr_dev(textarea, "placeholder", "Message");
    			add_location(textarea, file$q, 4, 2, 125);
    			add_location(br2, file$q, 4, 54, 177);
    			attr_dev(button, "class", "btn-primary active");
    			add_location(button, file$q, 5, 2, 184);
    			add_location(article, file$q, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			append_dev(article, h1);
    			append_dev(article, t1);
    			append_dev(article, input0);
    			append_dev(article, br0);
    			append_dev(article, t2);
    			append_dev(article, input1);
    			append_dev(article, br1);
    			append_dev(article, t3);
    			append_dev(article, textarea);
    			append_dev(article, br2);
    			append_dev(article, t4);
    			append_dev(article, button);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$u.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$u($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$u, create_fragment$u, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$u.name
    		});
    	}
    }

    const define$1 = (tagName, clazz) => {
      const isClient = typeof window !== 'undefined';
      if (isClient && !customElements.get(tagName))
        customElements.define(tagName, clazz);
    };

    const setProp = (el, prop, value) => {
      if (el) el[prop] = value;
    };

    const BUILD = {
        allRenderFn: false,
        cmpDidLoad: true,
        cmpDidUnload: false,
        cmpDidUpdate: true,
        cmpDidRender: true,
        cmpWillLoad: true,
        cmpWillUpdate: true,
        cmpWillRender: true,
        connectedCallback: true,
        disconnectedCallback: true,
        element: true,
        event: true,
        hasRenderFn: true,
        lifecycle: true,
        hostListener: true,
        hostListenerTargetWindow: true,
        hostListenerTargetDocument: true,
        hostListenerTargetBody: true,
        hostListenerTargetParent: false,
        hostListenerTarget: true,
        member: true,
        method: true,
        mode: true,
        observeAttribute: true,
        prop: true,
        propMutable: true,
        reflect: true,
        scoped: true,
        shadowDom: true,
        slot: true,
        cssAnnotations: true,
        state: true,
        style: true,
        svg: true,
        updatable: true,
        vdomAttribute: true,
        vdomXlink: true,
        vdomClass: true,
        vdomFunctional: true,
        vdomKey: true,
        vdomListener: true,
        vdomRef: true,
        vdomPropOrAttr: true,
        vdomRender: true,
        vdomStyle: true,
        vdomText: true,
        watchCallback: true,
        taskQueue: true,
        hotModuleReplacement: false,
        isDebug: false,
        isDev: false,
        isTesting: false,
        hydrateServerSide: false,
        hydrateClientSide: false,
        lifecycleDOMEvents: false,
        lazyLoad: false,
        profile: false,
        slotRelocation: true,
        appendChildSlotFix: false,
        cloneNodeFix: false,
        hydratedAttribute: false,
        hydratedClass: true,
        safari10: false,
        scriptDataOpts: false,
        shadowDomShim: false,
        slotChildNodesFix: false,
        propBoolean: true,
        propNumber: true,
        propString: true,
        cssVarShim: false,
        constructableCSS: true,
        cmpShouldUpdate: true,
        devTools: false,
        dynamicImportShim: false,
        shadowDelegatesFocus: true,
        initializeNextTick: false,
        asyncLoading: false,
        asyncQueue: false,
        transformTagName: false,
        attachStyles: true,
    };

    let scopeId;
    let contentRef;
    let hostTagName;
    let useNativeShadowDom = false;
    let checkSlotFallbackVisibility = false;
    let checkSlotRelocate = false;
    let isSvgMode = false;
    let renderingRef = null;
    let queuePending = false;
    const win = typeof window !== 'undefined' ? window : {};
    BUILD.cssVarShim ? win.CSS : null;
    const doc = win.document || { head: {} };
    (win.HTMLElement || class {
    });
    const plt = {
        $flags$: 0,
        $resourcesUrl$: '',
        jmp: h => h(),
        raf: h => requestAnimationFrame(h),
        ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
        rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
        ce: (eventName, opts) => new CustomEvent(eventName, opts),
    };
    const supportsShadow = BUILD.shadowDomShim && BUILD.shadowDom ? /*@__PURE__*/ (() => (doc.head.attachShadow + '').indexOf('[native') > -1)() : true;
    const supportsListenerOptions = /*@__PURE__*/ (() => {
        let supportsListenerOptions = false;
        try {
            doc.addEventListener('e', null, Object.defineProperty({}, 'passive', {
                get() {
                    supportsListenerOptions = true;
                },
            }));
        }
        catch (e) { }
        return supportsListenerOptions;
    })();
    const promiseResolve = (v) => Promise.resolve(v);
    const supportsConstructibleStylesheets = BUILD.constructableCSS
        ? /*@__PURE__*/ (() => {
            try {
                new CSSStyleSheet();
                return typeof (new CSSStyleSheet()).replace === 'function';
            }
            catch (e) { }
            return false;
        })()
        : false;
    const addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
        if (listeners) {
            listeners.map(([flags, name, method]) => {
                const target = getHostListenerTarget(elm, flags) ;
                const handler = hostListenerProxy(hostRef, method);
                const opts = hostListenerOpts(flags);
                plt.ael(target, name, handler, opts);
                (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
            });
        }
    };
    const hostListenerProxy = (hostRef, methodName) => (ev) => {
        try {
            if (BUILD.lazyLoad) ;
            else {
                hostRef.$hostElement$[methodName](ev);
            }
        }
        catch (e) {
            consoleError(e);
        }
    };
    const getHostListenerTarget = (elm, flags) => {
        if (flags & 4 /* TargetDocument */)
            return doc;
        if (flags & 8 /* TargetWindow */)
            return win;
        if (flags & 16 /* TargetBody */)
            return doc.body;
        return elm;
    };
    // prettier-ignore
    const hostListenerOpts = (flags) => supportsListenerOptions
        ? ({
            passive: (flags & 1 /* Passive */) !== 0,
            capture: (flags & 2 /* Capture */) !== 0,
        })
        : (flags & 2 /* Capture */) !== 0;
    const XLINK_NS = 'http://www.w3.org/1999/xlink';
    const createTime = (fnName, tagName = '') => {
        {
            return () => {
                return;
            };
        }
    };
    const rootAppliedStyles = new WeakMap();
    const registerStyle = (scopeId, cssText, allowCS) => {
        let style = styles.get(scopeId);
        if (supportsConstructibleStylesheets && allowCS) {
            style = (style || new CSSStyleSheet());
            style.replace(cssText);
        }
        else {
            style = cssText;
        }
        styles.set(scopeId, style);
    };
    const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
        let scopeId = getScopeId(cmpMeta, mode);
        let style = styles.get(scopeId);
        // if an element is NOT connected then getRootNode() will return the wrong root node
        // so the fallback is to always use the document for the root node in those cases
        styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
        if (style) {
            if (typeof style === 'string') {
                styleContainerNode = styleContainerNode.head || styleContainerNode;
                let appliedStyles = rootAppliedStyles.get(styleContainerNode);
                let styleElm;
                if (!appliedStyles) {
                    rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
                }
                if (!appliedStyles.has(scopeId)) {
                    {
                        {
                            styleElm = doc.createElement('style');
                            styleElm.innerHTML = style;
                        }
                        styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                    }
                    if (appliedStyles) {
                        appliedStyles.add(scopeId);
                    }
                }
            }
            else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
                styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
            }
        }
        return scopeId;
    };
    const attachStyles = (hostRef) => {
        const cmpMeta = hostRef.$cmpMeta$;
        const elm = hostRef.$hostElement$;
        const flags = cmpMeta.$flags$;
        const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
        const scopeId = addStyle(supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$);
        if (flags & 10 /* needsScopedEncapsulation */) {
            // only required when we're NOT using native shadow dom (slot)
            // or this browser doesn't support native shadow dom
            // and this host element was NOT created with SSR
            // let's pick out the inner content for slot projection
            // create a node to represent where the original
            // content was first placed, which is useful later on
            // DOM WRITE!!
            elm['s-sc'] = scopeId;
            elm.classList.add(scopeId + '-h');
            if (flags & 2 /* scopedCssEncapsulation */) {
                elm.classList.add(scopeId + '-s');
            }
        }
        endAttachStyles();
    };
    const getScopeId = (cmp, mode) => 'sc-' + (mode && cmp.$flags$ & 32 /* hasMode */ ? cmp.$tagName$ + '-' + mode : cmp.$tagName$);
    // Private
    const computeMode = (elm) => modeResolutionChain.map(h => h(elm)).find(m => !!m);
    /**
     * Default style mode id
     */
    /**
     * Reusable empty obj/array
     * Don't add values to these!!
     */
    const EMPTY_OBJ = {};
    /**
     * Namespaces
     */
    const SVG_NS = 'http://www.w3.org/2000/svg';
    const HTML_NS = 'http://www.w3.org/1999/xhtml';
    const isDef = (v) => v != null;
    const isComplexType = (o) => {
        // https://jsperf.com/typeof-fn-object/5
        o = typeof o;
        return o === 'object' || o === 'function';
    };
    /**
     * Production h() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */
    // const stack: any[] = [];
    // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
    // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
    const h = (nodeName, vnodeData, ...children) => {
        let child = null;
        let key = null;
        let slotName = null;
        let simple = false;
        let lastSimple = false;
        let vNodeChildren = [];
        const walk = (c) => {
            for (let i = 0; i < c.length; i++) {
                child = c[i];
                if (Array.isArray(child)) {
                    walk(child);
                }
                else if (child != null && typeof child !== 'boolean') {
                    if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                        child = String(child);
                    }
                    if (simple && lastSimple) {
                        // If the previous child was simple (string), we merge both
                        vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                    }
                    else {
                        // Append a new vNode, if it's text, we create a text vNode
                        vNodeChildren.push(simple ? newVNode(null, child) : child);
                    }
                    lastSimple = simple;
                }
            }
        };
        walk(children);
        if (vnodeData) {
            // normalize class / classname attributes
            if (vnodeData.key) {
                key = vnodeData.key;
            }
            if (vnodeData.name) {
                slotName = vnodeData.name;
            }
            {
                const classData = vnodeData.className || vnodeData.class;
                if (classData) {
                    vnodeData.class =
                        typeof classData !== 'object'
                            ? classData
                            : Object.keys(classData)
                                .filter(k => classData[k])
                                .join(' ');
                }
            }
        }
        if (typeof nodeName === 'function') {
            // nodeName is a functional component
            return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
        }
        const vnode = newVNode(nodeName, null);
        vnode.$attrs$ = vnodeData;
        if (vNodeChildren.length > 0) {
            vnode.$children$ = vNodeChildren;
        }
        {
            vnode.$key$ = key;
        }
        {
            vnode.$name$ = slotName;
        }
        return vnode;
    };
    const newVNode = (tag, text) => {
        const vnode = {
            $flags$: 0,
            $tag$: tag,
            $text$: text,
            $elm$: null,
            $children$: null,
        };
        {
            vnode.$attrs$ = null;
        }
        {
            vnode.$key$ = null;
        }
        {
            vnode.$name$ = null;
        }
        return vnode;
    };
    const Host = {};
    const isHost = (node) => node && node.$tag$ === Host;
    const vdomFnUtils = {
        forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
        map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
    };
    const convertToPublic = (node) => ({
        vattrs: node.$attrs$,
        vchildren: node.$children$,
        vkey: node.$key$,
        vname: node.$name$,
        vtag: node.$tag$,
        vtext: node.$text$,
    });
    const convertToPrivate = (node) => {
        if (typeof node.vtag === 'function') {
            const vnodeData = Object.assign({}, node.vattrs);
            if (node.vkey) {
                vnodeData.key = node.vkey;
            }
            if (node.vname) {
                vnodeData.name = node.vname;
            }
            return h(node.vtag, vnodeData, ...(node.vchildren || []));
        }
        const vnode = newVNode(node.vtag, node.vtext);
        vnode.$attrs$ = node.vattrs;
        vnode.$children$ = node.vchildren;
        vnode.$key$ = node.vkey;
        vnode.$name$ = node.vname;
        return vnode;
    };
    /**
     * Production setAccessor() function based on Preact by
     * Jason Miller (@developit)
     * Licensed under the MIT License
     * https://github.com/developit/preact/blob/master/LICENSE
     *
     * Modified for Stencil's compiler and vdom
     */
    const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
        if (oldValue !== newValue) {
            let isProp = isMemberInElement(elm, memberName);
            let ln = memberName.toLowerCase();
            if (memberName === 'class') {
                const classList = elm.classList;
                const oldClasses = parseClassList(oldValue);
                const newClasses = parseClassList(newValue);
                classList.remove(...oldClasses.filter(c => c && !newClasses.includes(c)));
                classList.add(...newClasses.filter(c => c && !oldClasses.includes(c)));
            }
            else if (memberName === 'style') {
                // update style attribute, css properties and values
                {
                    for (const prop in oldValue) {
                        if (!newValue || newValue[prop] == null) {
                            if (prop.includes('-')) {
                                elm.style.removeProperty(prop);
                            }
                            else {
                                elm.style[prop] = '';
                            }
                        }
                    }
                }
                for (const prop in newValue) {
                    if (!oldValue || newValue[prop] !== oldValue[prop]) {
                        if (prop.includes('-')) {
                            elm.style.setProperty(prop, newValue[prop]);
                        }
                        else {
                            elm.style[prop] = newValue[prop];
                        }
                    }
                }
            }
            else if (memberName === 'key')
                ;
            else if (memberName === 'ref') {
                // minifier will clean this up
                if (newValue) {
                    newValue(elm);
                }
            }
            else if ((!elm.__lookupSetter__(memberName)) && memberName[0] === 'o' && memberName[1] === 'n') {
                // Event Handlers
                // so if the member name starts with "on" and the 3rd characters is
                // a capital letter, and it's not already a member on the element,
                // then we're assuming it's an event listener
                if (memberName[2] === '-') {
                    // on- prefixed events
                    // allows to be explicit about the dom event to listen without any magic
                    // under the hood:
                    // <my-cmp on-click> // listens for "click"
                    // <my-cmp on-Click> // listens for "Click"
                    // <my-cmp on-ionChange> // listens for "ionChange"
                    // <my-cmp on-EVENTS> // listens for "EVENTS"
                    memberName = memberName.slice(3);
                }
                else if (isMemberInElement(win, ln)) {
                    // standard event
                    // the JSX attribute could have been "onMouseOver" and the
                    // member name "onmouseover" is on the window's prototype
                    // so let's add the listener "mouseover", which is all lowercased
                    memberName = ln.slice(2);
                }
                else {
                    // custom event
                    // the JSX attribute could have been "onMyCustomEvent"
                    // so let's trim off the "on" prefix and lowercase the first character
                    // and add the listener "myCustomEvent"
                    // except for the first character, we keep the event name case
                    memberName = ln[2] + memberName.slice(3);
                }
                if (oldValue) {
                    plt.rel(elm, memberName, oldValue, false);
                }
                if (newValue) {
                    plt.ael(elm, memberName, newValue, false);
                }
            }
            else {
                // Set property if it exists and it's not a SVG
                const isComplex = isComplexType(newValue);
                if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                    try {
                        if (!elm.tagName.includes('-')) {
                            let n = newValue == null ? '' : newValue;
                            // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                            if (memberName === 'list') {
                                isProp = false;
                                // tslint:disable-next-line: triple-equals
                            }
                            else if (oldValue == null || elm[memberName] != n) {
                                elm[memberName] = n;
                            }
                        }
                        else {
                            elm[memberName] = newValue;
                        }
                    }
                    catch (e) { }
                }
                /**
                 * Need to manually update attribute if:
                 * - memberName is not an attribute
                 * - if we are rendering the host element in order to reflect attribute
                 * - if it's a SVG, since properties might not work in <svg>
                 * - if the newValue is null/undefined or 'false'.
                 */
                let xlink = false;
                {
                    if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                        memberName = ln;
                        xlink = true;
                    }
                }
                if (newValue == null || newValue === false) {
                    if (newValue !== false || elm.getAttribute(memberName) === '') {
                        if (xlink) {
                            elm.removeAttributeNS(XLINK_NS, memberName);
                        }
                        else {
                            elm.removeAttribute(memberName);
                        }
                    }
                }
                else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
                    newValue = newValue === true ? '' : newValue;
                    if (xlink) {
                        elm.setAttributeNS(XLINK_NS, memberName, newValue);
                    }
                    else {
                        elm.setAttribute(memberName, newValue);
                    }
                }
            }
        }
    };
    const parseClassListRegex = /\s/;
    const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
    const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
        // if the element passed in is a shadow root, which is a document fragment
        // then we want to be adding attrs/props to the shadow root's "host" element
        // if it's not a shadow root, then we add attrs/props to the same element
        const elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
        const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
        const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
        {
            // remove attributes no longer present on the vnode by setting them to undefined
            for (memberName in oldVnodeAttrs) {
                if (!(memberName in newVnodeAttrs)) {
                    setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
                }
            }
        }
        // add new & update changed attributes
        for (memberName in newVnodeAttrs) {
            setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
        }
    };
    const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
        // tslint:disable-next-line: prefer-const
        let newVNode = newParentVNode.$children$[childIndex];
        let i = 0;
        let elm;
        let childNode;
        let oldVNode;
        if (!useNativeShadowDom) {
            // remember for later we need to check to relocate nodes
            checkSlotRelocate = true;
            if (newVNode.$tag$ === 'slot') {
                if (scopeId) {
                    // scoped css needs to add its scoped id to the parent element
                    parentElm.classList.add(scopeId + '-s');
                }
                newVNode.$flags$ |= newVNode.$children$
                    ? // slot element has fallback content
                        2 /* isSlotFallback */
                    : // slot element does not have fallback content
                        1 /* isSlotReference */;
            }
        }
        if (newVNode.$text$ !== null) {
            // create text node
            elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
        }
        else if (newVNode.$flags$ & 1 /* isSlotReference */) {
            // create a slot reference node
            elm = newVNode.$elm$ = doc.createTextNode('');
        }
        else {
            if (!isSvgMode) {
                isSvgMode = newVNode.$tag$ === 'svg';
            }
            // create element
            elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2 /* isSlotFallback */ ? 'slot-fb' : newVNode.$tag$)
                );
            if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
                isSvgMode = false;
            }
            // add css classes, attrs, props, listeners, etc.
            {
                updateElement(null, newVNode, isSvgMode);
            }
            if (isDef(scopeId) && elm['s-si'] !== scopeId) {
                // if there is a scopeId and this is the initial render
                // then let's add the scopeId as a css class
                elm.classList.add((elm['s-si'] = scopeId));
            }
            if (newVNode.$children$) {
                for (i = 0; i < newVNode.$children$.length; ++i) {
                    // create the node
                    childNode = createElm(oldParentVNode, newVNode, i, elm);
                    // return node could have been null
                    if (childNode) {
                        // append our new node
                        elm.appendChild(childNode);
                    }
                }
            }
            {
                if (newVNode.$tag$ === 'svg') {
                    // Only reset the SVG context when we're exiting <svg> element
                    isSvgMode = false;
                }
                else if (elm.tagName === 'foreignObject') {
                    // Reenter SVG context when we're exiting <foreignObject> element
                    isSvgMode = true;
                }
            }
        }
        {
            elm['s-hn'] = hostTagName;
            if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
                // remember the content reference comment
                elm['s-sr'] = true;
                // remember the content reference comment
                elm['s-cr'] = contentRef;
                // remember the slot name, or empty string for default slot
                elm['s-sn'] = newVNode.$name$ || '';
                // check if we've got an old vnode for this slot
                oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
                if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                    // we've got an old slot vnode and the wrapper is being replaced
                    // so let's move the old slot content back to it's original location
                    putBackInOriginalLocation(oldParentVNode.$elm$, false);
                }
            }
        }
        return elm;
    };
    const putBackInOriginalLocation = (parentElm, recursive) => {
        plt.$flags$ |= 1 /* isTmpDisconnected */;
        const oldSlotChildNodes = parentElm.childNodes;
        for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
            const childNode = oldSlotChildNodes[i];
            if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
                // // this child node in the old element is from another component
                // // remove this node from the old slot's parent
                // childNode.remove();
                // and relocate it back to it's original location
                parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
                // remove the old original location comment entirely
                // later on the patch function will know what to do
                // and move this to the correct spot in need be
                childNode['s-ol'].remove();
                childNode['s-ol'] = undefined;
                checkSlotRelocate = true;
            }
            if (recursive) {
                putBackInOriginalLocation(childNode, recursive);
            }
        }
        plt.$flags$ &= ~1 /* isTmpDisconnected */;
    };
    const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
        let containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
        let childNode;
        if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
            containerElm = containerElm.shadowRoot;
        }
        for (; startIdx <= endIdx; ++startIdx) {
            if (vnodes[startIdx]) {
                childNode = createElm(null, parentVNode, startIdx, parentElm);
                if (childNode) {
                    vnodes[startIdx].$elm$ = childNode;
                    containerElm.insertBefore(childNode, referenceNode(before) );
                }
            }
        }
    };
    const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
        for (; startIdx <= endIdx; ++startIdx) {
            if ((vnode = vnodes[startIdx])) {
                elm = vnode.$elm$;
                callNodeRefs(vnode);
                {
                    // we're removing this element
                    // so it's possible we need to show slot fallback content now
                    checkSlotFallbackVisibility = true;
                    if (elm['s-ol']) {
                        // remove the original location comment
                        elm['s-ol'].remove();
                    }
                    else {
                        // it's possible that child nodes of the node
                        // that's being removed are slot nodes
                        putBackInOriginalLocation(elm, true);
                    }
                }
                // remove the vnode's element from the dom
                elm.remove();
            }
        }
    };
    const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
        let oldStartIdx = 0;
        let newStartIdx = 0;
        let idxInOld = 0;
        let i = 0;
        let oldEndIdx = oldCh.length - 1;
        let oldStartVnode = oldCh[0];
        let oldEndVnode = oldCh[oldEndIdx];
        let newEndIdx = newCh.length - 1;
        let newStartVnode = newCh[0];
        let newEndVnode = newCh[newEndIdx];
        let node;
        let elmToMove;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                // Vnode might have been moved left
                oldStartVnode = oldCh[++oldStartIdx];
            }
            else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            }
            else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            }
            else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newStartVnode)) {
                patch(oldStartVnode, newStartVnode);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else if (isSameVnode(oldEndVnode, newEndVnode)) {
                patch(oldEndVnode, newEndVnode);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldStartVnode, newEndVnode)) {
                // Vnode moved right
                if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                    putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
                }
                patch(oldStartVnode, newEndVnode);
                parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            }
            else if (isSameVnode(oldEndVnode, newStartVnode)) {
                // Vnode moved left
                if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                    putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
                }
                patch(oldEndVnode, newStartVnode);
                parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // createKeyToOldIdx
                idxInOld = -1;
                {
                    for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                        if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                            idxInOld = i;
                            break;
                        }
                    }
                }
                if (idxInOld >= 0) {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                        node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                    }
                    else {
                        patch(elmToMove, newStartVnode);
                        oldCh[idxInOld] = undefined;
                        node = elmToMove.$elm$;
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
                else {
                    // new element
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                    newStartVnode = newCh[++newStartIdx];
                }
                if (node) {
                    {
                        parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                    }
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
        }
        else if (newStartIdx > newEndIdx) {
            removeVnodes(oldCh, oldStartIdx, oldEndIdx);
        }
    };
    const isSameVnode = (vnode1, vnode2) => {
        // compare if two vnode to see if they're "technically" the same
        // need to have the same element tag, and same key to be the same
        if (vnode1.$tag$ === vnode2.$tag$) {
            if (vnode1.$tag$ === 'slot') {
                return vnode1.$name$ === vnode2.$name$;
            }
            {
                return vnode1.$key$ === vnode2.$key$;
            }
        }
        return false;
    };
    const referenceNode = (node) => {
        // this node was relocated to a new location in the dom
        // because of some other component's slot
        // but we still have an html comment in place of where
        // it's original location was according to it's original vdom
        return (node && node['s-ol']) || node;
    };
    const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
    const patch = (oldVNode, newVNode) => {
        const elm = (newVNode.$elm$ = oldVNode.$elm$);
        const oldChildren = oldVNode.$children$;
        const newChildren = newVNode.$children$;
        const tag = newVNode.$tag$;
        const text = newVNode.$text$;
        let defaultHolder;
        if (text === null) {
            {
                // test if we're rendering an svg element, or still rendering nodes inside of one
                // only add this to the when the compiler sees we're using an svg somewhere
                isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
            }
            // element node
            {
                if (tag === 'slot')
                    ;
                else {
                    // either this is the first render of an element OR it's an update
                    // AND we already know it's possible it could have changed
                    // this updates the element's css classes, attrs, props, listeners, etc.
                    updateElement(oldVNode, newVNode, isSvgMode);
                }
            }
            if (oldChildren !== null && newChildren !== null) {
                // looks like there's child vnodes for both the old and new vnodes
                updateChildren(elm, oldChildren, newVNode, newChildren);
            }
            else if (newChildren !== null) {
                // no old child vnodes, but there are new child vnodes to add
                if (oldVNode.$text$ !== null) {
                    // the old vnode was text, so be sure to clear it out
                    elm.textContent = '';
                }
                // add the new vnode children
                addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
            }
            else if (oldChildren !== null) {
                // no new child vnodes, but there are old child vnodes to remove
                removeVnodes(oldChildren, 0, oldChildren.length - 1);
            }
            if (isSvgMode && tag === 'svg') {
                isSvgMode = false;
            }
        }
        else if ((defaultHolder = elm['s-cr'])) {
            // this element has slotted content
            defaultHolder.parentNode.textContent = text;
        }
        else if (oldVNode.$text$ !== text) {
            // update the text content for the text only vnode
            // and also only if the text is different than before
            elm.data = text;
        }
    };
    const updateFallbackSlotVisibility = (elm) => {
        // tslint:disable-next-line: prefer-const
        let childNodes = elm.childNodes;
        let childNode;
        let i;
        let ilen;
        let j;
        let slotNameAttr;
        let nodeType;
        for (i = 0, ilen = childNodes.length; i < ilen; i++) {
            childNode = childNodes[i];
            if (childNode.nodeType === 1 /* ElementNode */) {
                if (childNode['s-sr']) {
                    // this is a slot fallback node
                    // get the slot name for this slot reference node
                    slotNameAttr = childNode['s-sn'];
                    // by default always show a fallback slot node
                    // then hide it if there are other slots in the light dom
                    childNode.hidden = false;
                    for (j = 0; j < ilen; j++) {
                        nodeType = childNodes[j].nodeType;
                        if (childNodes[j]['s-hn'] !== childNode['s-hn'] || slotNameAttr !== '') {
                            // this sibling node is from a different component OR is a named fallback slot node
                            if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                        else {
                            // this is a default fallback slot node
                            // any element or text node (with content)
                            // should hide the default fallback slot node
                            if (nodeType === 1 /* ElementNode */ ||
                                (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                childNode.hidden = true;
                                break;
                            }
                        }
                    }
                }
                // keep drilling down
                updateFallbackSlotVisibility(childNode);
            }
        }
    };
    const relocateNodes = [];
    const relocateSlotContent = (elm) => {
        // tslint:disable-next-line: prefer-const
        let childNode;
        let node;
        let hostContentNodes;
        let slotNameAttr;
        let relocateNodeData;
        let j;
        let i = 0;
        let childNodes = elm.childNodes;
        let ilen = childNodes.length;
        for (; i < ilen; i++) {
            childNode = childNodes[i];
            if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
                // first got the content reference comment node
                // then we got it's parent, which is where all the host content is in now
                hostContentNodes = node.parentNode.childNodes;
                slotNameAttr = childNode['s-sn'];
                for (j = hostContentNodes.length - 1; j >= 0; j--) {
                    node = hostContentNodes[j];
                    if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                        // let's do some relocating to its new home
                        // but never relocate a content reference node
                        // that is suppose to always represent the original content location
                        if (isNodeLocatedInSlot(node, slotNameAttr)) {
                            // it's possible we've already decided to relocate this node
                            relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node);
                            // made some changes to slots
                            // let's make sure we also double check
                            // fallbacks are correctly hidden or shown
                            checkSlotFallbackVisibility = true;
                            node['s-sn'] = node['s-sn'] || slotNameAttr;
                            if (relocateNodeData) {
                                // previously we never found a slot home for this node
                                // but turns out we did, so let's remember it now
                                relocateNodeData.$slotRefNode$ = childNode;
                            }
                            else {
                                // add to our list of nodes to relocate
                                relocateNodes.push({
                                    $slotRefNode$: childNode,
                                    $nodeToRelocate$: node,
                                });
                            }
                            if (node['s-sr']) {
                                relocateNodes.map(relocateNode => {
                                    if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                        relocateNodeData = relocateNodes.find(r => r.$nodeToRelocate$ === node);
                                        if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                            relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                        }
                                    }
                                });
                            }
                        }
                        else if (!relocateNodes.some(r => r.$nodeToRelocate$ === node)) {
                            // so far this element does not have a slot home, not setting slotRefNode on purpose
                            // if we never find a home for this element then we'll need to hide it
                            relocateNodes.push({
                                $nodeToRelocate$: node,
                            });
                        }
                    }
                }
            }
            if (childNode.nodeType === 1 /* ElementNode */) {
                relocateSlotContent(childNode);
            }
        }
    };
    const isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
        if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
            if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
                return true;
            }
            if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
                return true;
            }
            return false;
        }
        if (nodeToRelocate['s-sn'] === slotNameAttr) {
            return true;
        }
        return slotNameAttr === '';
    };
    const callNodeRefs = (vNode) => {
        {
            vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
            vNode.$children$ && vNode.$children$.map(callNodeRefs);
        }
    };
    const renderVdom = (hostRef, renderFnResults) => {
        const hostElm = hostRef.$hostElement$;
        const cmpMeta = hostRef.$cmpMeta$;
        const oldVNode = hostRef.$vnode$ || newVNode(null, null);
        const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
        hostTagName = hostElm.tagName;
        if (cmpMeta.$attrsToReflect$) {
            rootVnode.$attrs$ = rootVnode.$attrs$ || {};
            cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
        }
        rootVnode.$tag$ = null;
        rootVnode.$flags$ |= 4 /* isHost */;
        hostRef.$vnode$ = rootVnode;
        rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
        {
            scopeId = hostElm['s-sc'];
        }
        {
            contentRef = hostElm['s-cr'];
            useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
            // always reset
            checkSlotFallbackVisibility = false;
        }
        // synchronous patch
        patch(oldVNode, rootVnode);
        {
            // while we're moving nodes around existing nodes, temporarily disable
            // the disconnectCallback from working
            plt.$flags$ |= 1 /* isTmpDisconnected */;
            if (checkSlotRelocate) {
                relocateSlotContent(rootVnode.$elm$);
                let relocateData;
                let nodeToRelocate;
                let orgLocationNode;
                let parentNodeRef;
                let insertBeforeNode;
                let refNode;
                let i = 0;
                for (; i < relocateNodes.length; i++) {
                    relocateData = relocateNodes[i];
                    nodeToRelocate = relocateData.$nodeToRelocate$;
                    if (!nodeToRelocate['s-ol']) {
                        // add a reference node marking this node's original location
                        // keep a reference to this node for later lookups
                        orgLocationNode = doc.createTextNode('');
                        orgLocationNode['s-nr'] = nodeToRelocate;
                        nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                    }
                }
                for (i = 0; i < relocateNodes.length; i++) {
                    relocateData = relocateNodes[i];
                    nodeToRelocate = relocateData.$nodeToRelocate$;
                    if (relocateData.$slotRefNode$) {
                        // by default we're just going to insert it directly
                        // after the slot reference node
                        parentNodeRef = relocateData.$slotRefNode$.parentNode;
                        insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                        orgLocationNode = nodeToRelocate['s-ol'];
                        while ((orgLocationNode = orgLocationNode.previousSibling)) {
                            refNode = orgLocationNode['s-nr'];
                            if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                                refNode = refNode.nextSibling;
                                if (!refNode || !refNode['s-nr']) {
                                    insertBeforeNode = refNode;
                                    break;
                                }
                            }
                        }
                        if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) || nodeToRelocate.nextSibling !== insertBeforeNode) {
                            // we've checked that it's worth while to relocate
                            // since that the node to relocate
                            // has a different next sibling or parent relocated
                            if (nodeToRelocate !== insertBeforeNode) {
                                if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                    // probably a component in the index.html that doesn't have it's hostname set
                                    nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                                }
                                // add it back to the dom but in its new home
                                parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                            }
                        }
                    }
                    else {
                        // this node doesn't have a slot home to go to, so let's hide it
                        if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                            nodeToRelocate.hidden = true;
                        }
                    }
                }
            }
            if (checkSlotFallbackVisibility) {
                updateFallbackSlotVisibility(rootVnode.$elm$);
            }
            // done moving nodes around
            // allow the disconnect callback to work again
            plt.$flags$ &= ~1 /* isTmpDisconnected */;
            // always reset
            relocateNodes.length = 0;
        }
    };
    const getElement = (ref) => (BUILD.lazyLoad ? getHostRef(ref).$hostElement$ : ref);
    const createEvent = (ref, name, flags) => {
        const elm = getElement(ref);
        return {
            emit: (detail) => {
                if (BUILD.isDev && !elm.isConnected) {
                    consoleDevWarn(`The "${name}" event was emitted, but the dispatcher node is no longer connected to the dom.`);
                }
                return emitEvent(elm, name, {
                    bubbles: !!(flags & 4 /* Bubbles */),
                    composed: !!(flags & 2 /* Composed */),
                    cancelable: !!(flags & 1 /* Cancellable */),
                    detail,
                });
            },
        };
    };
    const emitEvent = (elm, name, opts) => {
        const ev = plt.ce(name, opts);
        elm.dispatchEvent(ev);
        return ev;
    };
    const attachToAncestor = (hostRef, ancestorComponent) => {
    };
    const scheduleUpdate = (hostRef, isInitialLoad) => {
        {
            hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
        }
        attachToAncestor(hostRef, hostRef.$ancestorComponent$);
        // there is no ancestor component or the ancestor component
        // has already fired off its lifecycle update then
        // fire off the initial update
        const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
        return writeTask(dispatch) ;
    };
    const dispatchHooks = (hostRef, isInitialLoad) => {
        const elm = hostRef.$hostElement$;
        const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
        const instance = elm;
        let promise;
        if (isInitialLoad) {
            {
                promise = safeCall(instance, 'componentWillLoad');
            }
        }
        else {
            {
                promise = safeCall(instance, 'componentWillUpdate');
            }
        }
        {
            promise = then(promise, () => safeCall(instance, 'componentWillRender'));
        }
        endSchedule();
        return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
    };
    const updateComponent = async (hostRef, instance, isInitialLoad) => {
        // updateComponent
        const elm = hostRef.$hostElement$;
        const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
        elm['s-rc'];
        if (isInitialLoad) {
            // DOM WRITE!
            attachStyles(hostRef);
        }
        const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
        {
            callRender(hostRef, instance, elm);
        }
        endRender();
        endUpdate();
        {
            postUpdateComponent(hostRef);
        }
    };
    const callRender = (hostRef, instance, elm) => {
        // in order for bundlers to correctly treeshake the BUILD object
        // we need to ensure BUILD is not deoptimized within a try/catch
        // https://rollupjs.org/guide/en/#treeshake tryCatchDeoptimization
        const allRenderFn = false;
        const lazyLoad = false;
        const taskQueue = true ;
        const updatable = true ;
        try {
            renderingRef = instance;
            instance = allRenderFn ? instance.render() : instance.render && instance.render();
            if (updatable && taskQueue) {
                hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
            }
            if (updatable || lazyLoad) {
                hostRef.$flags$ |= 2 /* hasRendered */;
            }
            if (BUILD.hasRenderFn || BUILD.reflect) {
                if (BUILD.vdomRender || BUILD.reflect) {
                    // looks like we've got child nodes to render into this host element
                    // or we need to update the css class/attrs on the host element
                    // DOM WRITE!
                    if (BUILD.hydrateServerSide) ;
                    else {
                        renderVdom(hostRef, instance);
                    }
                }
            }
        }
        catch (e) {
            consoleError(e, hostRef.$hostElement$);
        }
        renderingRef = null;
        return null;
    };
    const getRenderingRef = () => renderingRef;
    const postUpdateComponent = (hostRef) => {
        const tagName = hostRef.$cmpMeta$.$tagName$;
        const elm = hostRef.$hostElement$;
        const endPostUpdate = createTime('postUpdate', tagName);
        const instance = elm;
        hostRef.$ancestorComponent$;
        {
            safeCall(instance, 'componentDidRender');
        }
        if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
            hostRef.$flags$ |= 64 /* hasLoadedComponent */;
            {
                safeCall(instance, 'componentDidLoad');
            }
            endPostUpdate();
        }
        else {
            {
                safeCall(instance, 'componentDidUpdate');
            }
            endPostUpdate();
        }
        // ( •_•)
        // ( •_•)>⌐■-■
        // (⌐■_■)
    };
    const safeCall = (instance, method, arg) => {
        if (instance && instance[method]) {
            try {
                return instance[method](arg);
            }
            catch (e) {
                consoleError(e);
            }
        }
        return undefined;
    };
    const then = (promise, thenFn) => {
        return promise && promise.then ? promise.then(thenFn) : thenFn();
    };
    const parsePropertyValue = (propValue, propType) => {
        // ensure this value is of the correct prop type
        if (propValue != null && !isComplexType(propValue)) {
            if (propType & 4 /* Boolean */) {
                // per the HTML spec, any string value means it is a boolean true value
                // but we'll cheat here and say that the string "false" is the boolean false
                return propValue === 'false' ? false : propValue === '' || !!propValue;
            }
            if (propType & 2 /* Number */) {
                // force it to be a number
                return parseFloat(propValue);
            }
            if (propType & 1 /* String */) {
                // could have been passed as a number or boolean
                // but we still want it as a string
                return String(propValue);
            }
            // redundant return here for better minification
            return propValue;
        }
        // not sure exactly what type we want
        // so no need to change to a different type
        return propValue;
    };
    const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
    const setValue = (ref, propName, newVal, cmpMeta) => {
        // check our new property value against our internal value
        const hostRef = getHostRef(ref);
        const elm = ref;
        const oldVal = hostRef.$instanceValues$.get(propName);
        const flags = hostRef.$flags$;
        const instance = elm;
        newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
        if (newVal !== oldVal) {
            // gadzooks! the property's value has changed!!
            // set our new value!
            hostRef.$instanceValues$.set(propName, newVal);
            {
                // get an array of method names of watch functions to call
                if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                    const watchMethods = cmpMeta.$watchers$[propName];
                    if (watchMethods) {
                        // this instance is watching for when this property changed
                        watchMethods.map(watchMethodName => {
                            try {
                                // fire off each of the watch methods that are watching this property
                                instance[watchMethodName](newVal, oldVal, propName);
                            }
                            catch (e) {
                                consoleError(e, elm);
                            }
                        });
                    }
                }
                if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                    if (instance.componentShouldUpdate) {
                        if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
                            return;
                        }
                    }
                    // looks like this value actually changed, so we've got work to do!
                    // but only if we've already rendered, otherwise just chill out
                    // queue that we need to do an update, but don't worry about queuing
                    // up millions cuz this function ensures it only runs once
                    scheduleUpdate(hostRef, false);
                }
            }
        }
    };
    const proxyComponent = (Cstr, cmpMeta, flags) => {
        if (cmpMeta.$members$) {
            if (Cstr.watchers) {
                cmpMeta.$watchers$ = Cstr.watchers;
            }
            // It's better to have a const than two Object.entries()
            const members = Object.entries(cmpMeta.$members$);
            const prototype = Cstr.prototype;
            members.map(([memberName, [memberFlags]]) => {
                if ((memberFlags & 31 /* Prop */ || (memberFlags & 32 /* State */))) {
                    // proxyComponent - prop
                    Object.defineProperty(prototype, memberName, {
                        get() {
                            // proxyComponent, get value
                            return getValue(this, memberName);
                        },
                        set(newValue) {
                            // proxyComponent, set value
                            setValue(this, memberName, newValue, cmpMeta);
                        },
                        configurable: true,
                        enumerable: true,
                    });
                }
            });
            {
                const attrNameToPropName = new Map();
                prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                    plt.jmp(() => {
                        const propName = attrNameToPropName.get(attrName);
                        this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                    });
                };
                // create an array of attributes to observe
                // and also create a map of html attribute name to js property name
                Cstr.observedAttributes = members
                    .filter(([_, m]) => m[0] & 15 /* HasAttribute */) // filter to only keep props that should match attributes
                    .map(([propName, m]) => {
                    const attrName = m[1] || propName;
                    attrNameToPropName.set(attrName, propName);
                    if (m[0] & 512 /* ReflectAttr */) {
                        cmpMeta.$attrsToReflect$.push([propName, attrName]);
                    }
                    return attrName;
                });
            }
        }
        return Cstr;
    };
    const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
        // initializeComponent
        if ((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0) {
            {
                // sync constructor component
                Cstr = elm.constructor;
                hostRef.$flags$ |= 128 /* isWatchReady */ | 32 /* hasInitializedComponent */;
            }
            if (Cstr.style) {
                // this component has styles but we haven't registered them yet
                let style = Cstr.style;
                if (typeof style !== 'string') {
                    style = style[(hostRef.$modeName$ = computeMode(elm))];
                }
                const scopeId = getScopeId(cmpMeta, hostRef.$modeName$);
                if (!styles.has(scopeId)) {
                    const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                    registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
                    endRegisterStyles();
                }
            }
        }
        // we've successfully created a lazy instance
        hostRef.$ancestorComponent$;
        const schedule = () => scheduleUpdate(hostRef, true);
        {
            schedule();
        }
    };
    const fireConnectedCallback = (instance) => {
    };
    const connectedCallback = (elm) => {
        if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
            const hostRef = getHostRef(elm);
            const cmpMeta = hostRef.$cmpMeta$;
            const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
            if (!(hostRef.$flags$ & 1 /* hasConnected */)) {
                // first time this component has connected
                hostRef.$flags$ |= 1 /* hasConnected */;
                {
                    // initUpdate
                    // if the slot polyfill is required we'll need to put some nodes
                    // in here to act as original content anchors as we move nodes around
                    // host element has been connected to the DOM
                    if ((cmpMeta.$flags$ & (4 /* hasSlotRelocation */ | 8 /* needsShadowDomShim */))) {
                        setContentReference(elm);
                    }
                }
                {
                    initializeComponent(elm, hostRef, cmpMeta);
                }
            }
            else {
                // not the first time this has connected
                // reattach any event listeners to the host
                // since they would have been removed when disconnected
                addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
                // fire off connectedCallback() on component instance
                fireConnectedCallback(hostRef.$lazyInstance$);
            }
            endConnected();
        }
    };
    const setContentReference = (elm) => {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        const contentRefElm = (elm['s-cr'] = doc.createComment(''));
        contentRefElm['s-cn'] = true;
        elm.insertBefore(contentRefElm, elm.firstChild);
    };
    const disconnectedCallback = (elm) => {
        if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
            const hostRef = getHostRef(elm);
            {
                if (hostRef.$rmListeners$) {
                    hostRef.$rmListeners$.map(rmListener => rmListener());
                    hostRef.$rmListeners$ = undefined;
                }
            }
        }
    };
    const proxyCustomElement = (Cstr, compactMeta) => {
        const cmpMeta = {
            $flags$: compactMeta[0],
            $tagName$: compactMeta[1],
        };
        if (BUILD.member) {
            cmpMeta.$members$ = compactMeta[2];
        }
        if (BUILD.hostListener) {
            cmpMeta.$listeners$ = compactMeta[3];
        }
        if (BUILD.watchCallback) {
            cmpMeta.$watchers$ = Cstr.$watchers$;
        }
        if (BUILD.reflect) {
            cmpMeta.$attrsToReflect$ = [];
        }
        if (BUILD.shadowDom && !supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
            cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
        }
        const originalConnectedCallback = Cstr.prototype.connectedCallback;
        const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
        Object.assign(Cstr.prototype, {
            __registerHost() {
                registerHost(this, cmpMeta);
            },
            connectedCallback() {
                connectedCallback(this);
                if (BUILD.connectedCallback && originalConnectedCallback) {
                    originalConnectedCallback.call(this);
                }
            },
            disconnectedCallback() {
                disconnectedCallback(this);
                if (BUILD.disconnectedCallback && originalDisconnectedCallback) {
                    originalDisconnectedCallback.call(this);
                }
            },
        });
        Cstr.is = cmpMeta.$tagName$;
        return proxyComponent(Cstr, cmpMeta);
    };
    const attachShadow = (el) => {
        if (supportsShadow) {
            el.attachShadow({ mode: 'open' });
        }
        else {
            el.shadowRoot = el;
        }
    };
    const Fragment = (_, children) => children;
    const hostRefs = new WeakMap();
    const getHostRef = (ref) => hostRefs.get(ref);
    const registerHost = (elm, cmpMeta) => {
        const hostRef = {
            $flags$: 0,
            $hostElement$: elm,
            $cmpMeta$: cmpMeta,
            $instanceValues$: new Map(),
        };
        if (BUILD.isDev) {
            hostRef.$renderCount$ = 0;
        }
        if (BUILD.method && BUILD.lazyLoad) {
            hostRef.$onInstancePromise$ = new Promise(r => (hostRef.$onInstanceResolve$ = r));
        }
        if (BUILD.asyncLoading) {
            hostRef.$onReadyPromise$ = new Promise(r => (hostRef.$onReadyResolve$ = r));
            elm['s-p'] = [];
            elm['s-rc'] = [];
        }
        addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
        return hostRefs.set(elm, hostRef);
    };
    const isMemberInElement = (elm, memberName) => memberName in elm;
    const consoleError = (e, el) => (0, console.error)(e, el);
    const STENCIL_DEV_MODE = BUILD.isTesting
        ? ['STENCIL:'] // E2E testing
        : ['%cstencil', 'color: white;background:#4c47ff;font-weight: bold; font-size:10px; padding:2px 6px; border-radius: 5px'];
    const consoleDevWarn = (...m) => console.warn(...STENCIL_DEV_MODE, ...m);
    const styles = new Map();
    const modeResolutionChain = [];
    const queueDomReads = [];
    const queueDomWrites = [];
    const queueTask = (queue, write) => (cb) => {
        queue.push(cb);
        if (!queuePending) {
            queuePending = true;
            if (write && plt.$flags$ & 4 /* queueSync */) {
                nextTick(flush);
            }
            else {
                plt.raf(flush);
            }
        }
    };
    const consume = (queue) => {
        for (let i = 0; i < queue.length; i++) {
            try {
                queue[i](performance.now());
            }
            catch (e) {
                consoleError(e);
            }
        }
        queue.length = 0;
    };
    const flush = () => {
        // always force a bunch of medium callbacks to run, but still have
        // a throttle on how many can run in a certain time
        // DOM READS!!!
        consume(queueDomReads);
        // DOM WRITES!!!
        {
            consume(queueDomWrites);
            if ((queuePending = queueDomReads.length > 0)) {
                // still more to do yet, but we've run out of time
                // let's let this thing cool off and try again in the next tick
                plt.raf(flush);
            }
        }
    };
    const nextTick =  (cb) => promiseResolve().then(cb);
    const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);
    ({
        isDev: BUILD.isDev ? true : false,
        isBrowser: true,
        isServer: false,
        isTesting: BUILD.isTesting ? true : false,
    });

    /**
     * Listen to an event on the given DOM node. Returns a callback to remove the event listener.
     */
    function listen(node, event, handler, options) {
      node.addEventListener(event, handler, options);
      return () => node.removeEventListener(event, handler, options);
    }
    function fireEventAndRetry(el, event, onFail, interval = 300, maxRetries = 10) {
      let timeout;
      let attempt = 0;
      let found = false;
      function retry() {
        if (found)
          return;
        timeout = setTimeout(() => {
          if (attempt === maxRetries) {
            onFail === null || onFail === void 0 ? void 0 : onFail();
            return;
          }
          el.dispatchEvent(event);
          attempt += 1;
          retry();
        }, interval);
      }
      retry();
      return () => {
        window.clearTimeout(timeout);
        found = true;
      };
    }
    const isColliding = (a, b, translateAx = 0, translateAy = 0, translateBx = 0, translateBy = 0) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (aRect.left + translateAx < bRect.right + translateBx &&
        aRect.right + translateAx > bRect.left + translateBx &&
        aRect.top + translateAy < bRect.bottom + translateBy &&
        aRect.bottom + translateAy > bRect.top + translateBy);
    };

    /**
     * No-operation (noop).
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const noop = (..._) => {
      // ...
    };
    /**
     * Checks if `value` is `null`.
     *
     * @param value - The value to check.
     */
    const isNull = (value) => value === null;
    /**
     * Checks if `value` is `undefined`.
     *
     * @param value - The value to check.
     */
    const isUndefined = (value) => typeof value === 'undefined';
    /**
     * Checks if `value` is `null` or `undefined`.
     *
     * @param value - The value to check.
     */
    const isNil = (value) => isNull(value) || isUndefined(value);
    /**
     * Returns the constructor of the given `value`.
     *
     * @param value - The value to return the constructor of.
     */
    const getConstructor = (value) => 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    !isNil(value) ? value.constructor : undefined;
    /**
     * Checks if `value` is classified as a `Object` object.
     *
     * @param value - The value to check.
     */
    const isObject = (value) => getConstructor(value) === Object;
    /**
     * Checks if `value` is classified as a `Number` object.
     *
     * @param value - The value to check.
     */
    const isNumber = (value) => getConstructor(value) === Number && !Number.isNaN(value);
    /**
     * Checks if `value` is classified as a `String` object.
     *
     * @param value - The value to check.
     */
    const isString = (value) => getConstructor(value) === String;
    /**
     * Checks if `value` is classified as a `Boolean` object.
     *
     * @param value - The value to check.
     */
    const isBoolean = (value) => getConstructor(value) === Boolean;
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @param value - The value to check.
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    const isFunction = (value) => getConstructor(value) === Function;
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @param value - The value to check.
     */
    const isArray = (value) => Array.isArray(value);
    /**
     * Checks if `value` is an instanceof the given `constructor`.
     *
     * @param value - The value to check.
     * @param constructor - The constructor to check against.
     */
    const isInstanceOf = (value, constructor) => Boolean(value && constructor && value instanceof constructor);

    /**
     * Creates an empty Promise and defers resolving/rejecting it.
     */
    const deferredPromise = () => {
      let resolve = noop;
      let reject = noop;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };

    function wrapStencilHook(component, lifecycle, hook) {
      const prevHook = component[lifecycle];
      component[lifecycle] = function () {
        hook();
        return prevHook ? prevHook.call(component) : undefined;
      };
    }
    function createStencilHook(component, onConnect, onDisconnect) {
      let hasLoaded = false;
      if (!isUndefined(onConnect)) {
        wrapStencilHook(component, 'componentWillLoad', () => {
          onConnect();
          hasLoaded = true;
        });
        wrapStencilHook(component, 'connectedCallback', () => {
          if (hasLoaded)
            onConnect();
        });
      }
      if (!isUndefined(onDisconnect)) {
        wrapStencilHook(component, 'disconnectedCallback', () => {
          onDisconnect();
        });
      }
    }

    const FIND_PLAYER_EVENT = 'vmFindPlayer';
    function withFindPlayer(player) {
      const el = getElement(player);
      let off;
      createStencilHook(player, () => {
        off = listen(el, FIND_PLAYER_EVENT, (event) => {
          event.stopPropagation();
          event.detail(el);
        });
      }, () => {
        off === null || off === void 0 ? void 0 : off();
      });
    }
    /**
     * Finds the closest ancestor player element by firing the `vmFindPlayer` event, and waiting
     * for the player to catch it. This function retries finding the player (`maxRetries`) until it
     * gives up and fails.
     *
     * @param ref - A HTMLElement that is within the player's subtree.
     * @param interval - The length of the timeout before trying again in milliseconds.
     * @param maxRetries - The number of times to retry firing the event.
     */
    const findPlayer = (ref, interval = 300, maxRetries = 10) => {
      const el = (isInstanceOf(ref, HTMLElement)
        ? ref
        : getElement(ref));
      const search = deferredPromise();
      // eslint-disable-next-line prefer-const
      let stopFiring;
      const event = new CustomEvent(FIND_PLAYER_EVENT, {
        bubbles: true,
        composed: true,
        detail: player => {
          search.resolve(player);
          stopFiring();
        },
      });
      stopFiring = fireEventAndRetry(el, event, () => {
        search.reject(`Could not find player for ${el.nodeName}`);
      }, interval, maxRetries);
      return search.promise;
    };

    var MediaType;
    (function (MediaType) {
      MediaType["Audio"] = "audio";
      MediaType["Video"] = "video";
    })(MediaType || (MediaType = {}));

    const STATE_CHANGE_EVENT = 'vmStateChange';
    /**
     * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
     * the custom `vmStateChange` event.
     *
     * @param ref An element to dispatch the state change events from.
     */
    const createDispatcher = (ref) => (prop, value) => {
      const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
      const event = new CustomEvent(STATE_CHANGE_EVENT, {
        bubbles: true,
        composed: true,
        detail: { by: el, prop, value },
      });
      el.dispatchEvent(event);
    };

    const en = {
      play: 'Play',
      pause: 'Pause',
      playback: 'Playback',
      scrubber: 'Scrubber',
      scrubberLabel: '{currentTime} of {duration}',
      played: 'Played',
      duration: 'Duration',
      buffered: 'Buffered',
      close: 'Close',
      currentTime: 'Current time',
      live: 'LIVE',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      audio: 'Audio',
      default: 'Default',
      captions: 'Captions',
      subtitlesOrCc: 'Subtitles/CC',
      enableCaptions: 'Enable subtitles/captions',
      disableCaptions: 'Disable subtitles/captions',
      auto: 'Auto',
      fullscreen: 'Fullscreen',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      settings: 'Settings',
      seekForward: 'Seek forward',
      seekBackward: 'Seek backward',
      seekTotal: 'Seek total',
      normal: 'Normal',
      none: 'None',
      playbackRate: 'Playback Rate',
      playbackQuality: 'Playback Quality',
      loop: 'Loop',
      disabled: 'Disabled',
      off: 'Off',
      enabled: 'Enabled',
      pip: 'Picture-in-Picture',
      enterPiP: 'Miniplayer',
      exitPiP: 'Expand',
    };

    const initialState = {
      theme: undefined,
      paused: true,
      playing: false,
      duration: -1,
      currentProvider: undefined,
      mediaTitle: undefined,
      currentSrc: undefined,
      currentPoster: undefined,
      textTracks: [],
      currentTextTrack: -1,
      audioTracks: [],
      currentAudioTrack: -1,
      isTextTrackVisible: true,
      shouldRenderNativeTextTracks: true,
      icons: 'vime',
      currentTime: 0,
      autoplay: false,
      ready: false,
      playbackReady: false,
      loop: false,
      muted: false,
      buffered: 0,
      playbackRate: 1,
      playbackRates: [1],
      playbackQuality: undefined,
      playbackQualities: [],
      seeking: false,
      debug: false,
      playbackStarted: false,
      playbackEnded: false,
      buffering: false,
      controls: false,
      isControlsActive: false,
      volume: 50,
      isFullscreenActive: false,
      aspectRatio: '16:9',
      viewType: undefined,
      isAudioView: false,
      isVideoView: false,
      mediaType: undefined,
      isAudio: false,
      isVideo: false,
      isMobile: false,
      isTouch: false,
      isSettingsActive: false,
      isLive: false,
      isPiPActive: false,
      autopause: true,
      playsinline: false,
      language: 'en',
      languages: ['en'],
      translations: { en },
      i18n: en,
    };
    const writableProps = new Set([
      'autoplay',
      'autopause',
      'aspectRatio',
      'controls',
      'theme',
      'debug',
      'paused',
      'currentTime',
      'language',
      'loop',
      'translations',
      'playbackQuality',
      'muted',
      'playbackRate',
      'playsinline',
      'volume',
      'isSettingsActive',
      'isControlsActive',
      'shouldRenderNativeTextTracks',
    ]);
    const isWritableProp = (prop) => writableProps.has(prop);
    /**
     * Player properties that should be reset when the media is changed.
     */
    const resetableProps = new Set([
      'paused',
      'currentTime',
      'duration',
      'buffered',
      'seeking',
      'playing',
      'buffering',
      'playbackReady',
      'textTracks',
      'currentTextTrack',
      'audioTracks',
      'currentAudioTrack',
      'mediaTitle',
      'currentSrc',
      'currentPoster',
      'playbackRate',
      'playbackRates',
      'playbackStarted',
      'playbackEnded',
      'playbackQuality',
      'playbackQualities',
      'mediaType',
    ]);
    const shouldPropResetOnMediaChange = (prop) => resetableProps.has(prop);

    var ViewType;
    (function (ViewType) {
      ViewType["Audio"] = "audio";
      ViewType["Video"] = "video";
    })(ViewType || (ViewType = {}));

    class Disposal {
      constructor(dispose = []) {
        this.dispose = dispose;
      }
      add(callback) {
        this.dispose.push(callback);
      }
      empty() {
        this.dispose.forEach(fn => fn());
        this.dispose = [];
      }
    }

    var __awaiter$y = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const PLAYER_KEY = Symbol('vmPlayerKey');
    const COMPONENT_NAME_KEY = Symbol('vmNameKey');
    const REGISTRY_KEY = Symbol('vmRegistryKey');
    const REGISTRATION_KEY = Symbol('vmRegistrationKey');
    const REGISTER_COMPONENT_EVENT = 'vmComponentRegister';
    const COMPONENT_REGISTERED_EVENT = 'vmComponentRegistered';
    const COMPONENT_DEREGISTERED_EVENT = 'vmComponentDeregistered';
    const getRegistrant = (ref) => isInstanceOf(ref, HTMLElement)
      ? ref
      : getElement(ref);
    /**
     * Handles registering/deregistering the given `component` in the player registry. All registries
     * are bound per player subtree.
     *
     * @param ref - A Stencil component instance or HTMLElement.
     */
    function withComponentRegistry(ref, name) {
      const registryId = Symbol('vmRegistryId');
      const registrant = getRegistrant(ref);
      registrant[COMPONENT_NAME_KEY] = name !== null && name !== void 0 ? name : registrant.nodeName.toLowerCase();
      registrant[REGISTRATION_KEY] = registryId;
      const buildEvent = (eventName) => new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: registrant,
      });
      const registerEvent = buildEvent(REGISTER_COMPONENT_EVENT);
      createStencilHook(ref, () => {
        registrant.dispatchEvent(registerEvent);
      });
    }
    function withComponentRegistrar(player) {
      const el = getElement(player);
      const registry = new Map();
      const disposal = new Disposal();
      // TODO properly type this later.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      el[REGISTRY_KEY] = registry;
      function onDeregister(registrant) {
        delete registrant[PLAYER_KEY];
        delete registrant[REGISTRY_KEY];
        registry.delete(registrant[REGISTRATION_KEY]);
        el.dispatchEvent(new CustomEvent(COMPONENT_DEREGISTERED_EVENT, { detail: registrant }));
      }
      function onRegister(e) {
        const ref = e.detail;
        const registrant = getRegistrant(ref);
        registrant[PLAYER_KEY] = el;
        registrant[REGISTRY_KEY] = registry;
        registry.set(registrant[REGISTRATION_KEY], registrant);
        el.dispatchEvent(new CustomEvent(COMPONENT_REGISTERED_EVENT, { detail: registrant }));
        createStencilHook(ref, undefined, () => onDeregister(registrant));
      }
      createStencilHook(player, () => {
        disposal.add(listen(el, REGISTER_COMPONENT_EVENT, onRegister));
      }, () => {
        registry.clear();
        disposal.empty();
        delete player[REGISTRY_KEY];
      });
    }
    /**
     * Checks whether any component with the given `name` exists in the registry. All registries
     * are bound per player subtree.
     *
     * @param ref - A Stencil component instance or HTMLElement.
     * @param name - The name of the component to search for.
     */
    function isComponentRegistered(ref, name) {
      var _a;
      const registrant = getRegistrant(ref);
      const registry = registrant[REGISTRY_KEY];
      return Array.from((_a = registry === null || registry === void 0 ? void 0 : registry.values()) !== null && _a !== void 0 ? _a : []).some(r => r[COMPONENT_NAME_KEY] === name);
    }
    /**
     * Returns the player for the given `ref`. This will only work after the component has been
     * registered, prefer using `findPlayer`.
     *
     * @param ref - A Stencil component instance or HTMLElement.
     */
    function getPlayerFromRegistry(ref) {
      const registrant = getRegistrant(ref);
      return registrant[PLAYER_KEY];
    }
    /**
     * Returns a collection of components from the registry for the given `ref`. All registries
     * are bound per player subtree.
     *
     * @param ref - A Stencil component instance or HTMLElement.
     * @param name - The name of the components to search for in the registry.
     */
    function getComponentFromRegistry(ref, name) {
      var _a, _b;
      const registrant = getRegistrant(ref);
      return Array.from((_b = (_a = registrant[REGISTRY_KEY]) === null || _a === void 0 ? void 0 : _a.values()) !== null && _b !== void 0 ? _b : []).filter(r => r[COMPONENT_NAME_KEY] === name);
    }
    /**
     * Watches the current registry on the given `ref` for changes. All registries are bound per
     * player subtree.
     *
     * @param ref - A Stencil component instance or HTMLElement.
     * @param name - The name of the component to watch for.
     * @param onChange - A callback that is called when a component is registered/deregistered.
     */
    function watchComponentRegistry(ref, name, onChange) {
      var _a;
      return __awaiter$y(this, void 0, void 0, function* () {
        const player = yield findPlayer(ref);
        const disposal = new Disposal();
        const registry = getRegistrant(ref)[REGISTRY_KEY];
        function listener(e) {
          if (e.detail[COMPONENT_NAME_KEY] === name)
            onChange === null || onChange === void 0 ? void 0 : onChange(getComponentFromRegistry(player, name));
        }
        // Hydrate.
        Array.from((_a = registry === null || registry === void 0 ? void 0 : registry.values()) !== null && _a !== void 0 ? _a : []).forEach(reg => listener(new CustomEvent('', { detail: reg })));
        if (!isUndefined(player)) {
          disposal.add(listen(player, COMPONENT_REGISTERED_EVENT, listener));
          disposal.add(listen(player, COMPONENT_DEREGISTERED_EVENT, listener));
        }
        createStencilHook(ref, () => {
          // no-op
        }, () => {
          disposal.empty();
        });
        return () => {
          disposal.empty();
        };
      });
    }

    var createDeferredPromise = function () {
        var resolve;
        var promise = new Promise(function (res) { resolve = res; });
        return { promise: promise, resolve: resolve };
    };

    var openWormhole = function (Component, props, isBlocking) {
        if (isBlocking === void 0) { isBlocking = true; }
        var isConstructor = (Component.constructor.name === 'Function');
        var Proto = isConstructor ? Component.prototype : Component;
        var componentWillLoad = Proto.componentWillLoad;
        Proto.componentWillLoad = function () {
            var _this = this;
            var el = getElement(this);
            var onOpen = createDeferredPromise();
            var event = new CustomEvent('openWormhole', {
                bubbles: true,
                composed: true,
                detail: {
                    consumer: this,
                    fields: props,
                    updater: function (prop, value) {
                        var target = (prop in el) ? el : _this;
                        target[prop] = value;
                    },
                    onOpen: onOpen,
                },
            });
            el.dispatchEvent(event);
            var willLoad = function () {
                if (componentWillLoad) {
                    return componentWillLoad.call(_this);
                }
            };
            return isBlocking ? onOpen.promise.then(function () { return willLoad(); }) : (willLoad());
        };
    };

    var multiverse = new Map();
    var updateConsumer = function (_a, state) {
        var fields = _a.fields, updater = _a.updater;
        fields.forEach(function (field) { updater(field, state[field]); });
    };
    var Universe = {
        create: function (creator, initialState) {
            var el = getElement(creator);
            var wormholes = new Map();
            var universe = { wormholes: wormholes, state: initialState };
            multiverse.set(creator, universe);
            var connectedCallback = creator.connectedCallback;
            creator.connectedCallback = function () {
                multiverse.set(creator, universe);
                if (connectedCallback) {
                    connectedCallback.call(creator);
                }
            };
            var disconnectedCallback = creator.disconnectedCallback;
            creator.disconnectedCallback = function () {
                multiverse.delete(creator);
                if (disconnectedCallback) {
                    disconnectedCallback.call(creator);
                }
            };
            el.addEventListener('openWormhole', function (event) {
                event.stopPropagation();
                var _a = event.detail, consumer = _a.consumer, onOpen = _a.onOpen;
                if (wormholes.has(consumer))
                    return;
                if (typeof consumer !== 'symbol') {
                    var connectedCallback_1 = consumer.connectedCallback, disconnectedCallback_1 = consumer.disconnectedCallback;
                    consumer.connectedCallback = function () {
                        wormholes.set(consumer, event.detail);
                        if (connectedCallback_1) {
                            connectedCallback_1.call(consumer);
                        }
                    };
                    consumer.disconnectedCallback = function () {
                        wormholes.delete(consumer);
                        if (disconnectedCallback_1) {
                            disconnectedCallback_1.call(consumer);
                        }
                    };
                }
                wormholes.set(consumer, event.detail);
                updateConsumer(event.detail, universe.state);
                onOpen === null || onOpen === void 0 ? void 0 : onOpen.resolve(function () { wormholes.delete(consumer); });
            });
            el.addEventListener('closeWormhole', function (event) {
                var consumer = event.detail;
                wormholes.delete(consumer);
            });
        },
        Provider: function (_a, children) {
            var state = _a.state;
            var creator = getRenderingRef();
            if (multiverse.has(creator)) {
                var universe = multiverse.get(creator);
                universe.state = state;
                universe.wormholes.forEach(function (opening) { updateConsumer(opening, state); });
            }
            return children;
        }
    };

    const LOAD_START_EVENT = 'vmLoadStart';
    // Events that toggle state and the prop is named `is{PropName}...`.
    const isToggleStateEvent = new Set([
      'isFullscreenActive',
      'isControlsActive',
      'isTextTrackVisible',
      'isPiPActive',
      'isLive',
      'isTouch',
      'isAudio',
      'isVideo',
      'isAudioView',
      'isVideoView',
    ]);
    // Events that are emitted without the 'Change' postfix.
    const hasShortenedEventName = new Set([
      'ready',
      'playbackStarted',
      'playbackEnded',
      'playbackReady',
    ]);
    const getEventName = (prop) => {
      // Example: isFullscreenActive -> vmFullscreenChange
      if (isToggleStateEvent.has(prop)) {
        return `vm${prop.replace('is', '').replace('Active', '')}Change`;
      }
      // Example: playbackStarted -> vmPlaybackStarted
      if (hasShortenedEventName.has(prop)) {
        return `vm${prop.charAt(0).toUpperCase()}${prop.slice(1)}`;
      }
      // Example: currentTime -> vmCurrentTimeChange
      return `vm${prop.charAt(0).toUpperCase()}${prop.slice(1)}Change`;
    };
    function firePlayerEvent(el, prop, newValue, oldValue) {
      const events = [];
      events.push(new CustomEvent(getEventName(prop), { detail: newValue }));
      if (prop === 'paused' && !newValue)
        events.push(new CustomEvent('vmPlay'));
      if (prop === 'seeking' && oldValue && !newValue)
        events.push(new CustomEvent('vmSeeked'));
      events.forEach(event => {
        el.dispatchEvent(event);
      });
    }
    /**
     * Binds props between an instance of a given component class and it's closest ancestor player.
     *
     * @param component A Stencil component instance.
     * @param props A set of props to watch and update on the given component instance.
     */
    const withPlayerContext = (component, props) => openWormhole(component, props);

    var Provider;
    (function (Provider) {
      Provider["Audio"] = "audio";
      Provider["Video"] = "video";
      Provider["HLS"] = "hls";
      Provider["Dash"] = "dash";
      Provider["YouTube"] = "youtube";
      Provider["Vimeo"] = "vimeo";
      Provider["Dailymotion"] = "dailymotion";
    })(Provider || (Provider = {}));

    const audioRegex = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/i;
    const videoRegex = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/i;
    const hlsRegex = /\.(m3u8)($|\?)/i;
    const hlsTypeRegex = /^application\/(x-mpegURL|vnd\.apple\.mpegURL)$/i;
    const dashRegex = /\.(mpd)($|\?)/i;

    const PROVIDER_CHANGE_EVENT = 'vmProviderChange';
    /**
     * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
     * the custom `vmProviderChange` event.
     *
     * @param ref A component reference to dispatch the state change events from.
     */
    const createProviderDispatcher = (ref) => (prop, value) => {
      const el = isInstanceOf(ref, HTMLElement) ? ref : getElement(ref);
      const event = new CustomEvent(PROVIDER_CHANGE_EVENT, {
        bubbles: true,
        composed: true,
        detail: { by: el, prop, value },
      });
      el.dispatchEvent(event);
    };

    const providerWritableProps = new Set([
      'ready',
      'playing',
      'playbackReady',
      'playbackStarted',
      'playbackEnded',
      'seeking',
      'buffered',
      'buffering',
      'duration',
      'viewType',
      'mediaTitle',
      'mediaType',
      'currentSrc',
      'currentPoster',
      'playbackRates',
      'playbackQualities',
      'textTracks',
      'currentTextTrack',
      'isTextTrackVisible',
      'audioTracks',
      'currentAudioTrack',
      'isPiPActive',
      'isFullscreenActive',
    ]);
    const isProviderWritableProp = (prop) => isWritableProp(prop) || providerWritableProps.has(prop);

    var __awaiter$w = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const PROVIDER_CACHE_KEY = Symbol('vmProviderCache');
    const PROVIDER_CONNECT_EVENT = 'vmMediaProviderConnect';
    const PROVIDER_DISCONNECT_EVENT = 'vmMediaProviderDisconnect';
    function buildProviderConnectEvent(name, host) {
      return new CustomEvent(name, {
        bubbles: true,
        composed: true,
        detail: host,
      });
    }
    function withProviderHost(connector) {
      const el = getElement(connector);
      const disposal = new Disposal();
      const cache = new Map();
      connector[PROVIDER_CACHE_KEY] = cache;
      function initCache() {
        Object.keys(connector).forEach(prop => {
          cache.set(prop, connector[prop]);
        });
      }
      function onDisconnect() {
        writeTask(() => __awaiter$w(this, void 0, void 0, function* () {
          var _a;
          connector.ready = false;
          connector.provider = undefined;
          cache.clear();
          (_a = connector.onProviderDisconnect) === null || _a === void 0 ? void 0 : _a.call(connector);
          el.dispatchEvent(buildProviderConnectEvent(PROVIDER_DISCONNECT_EVENT));
        }));
      }
      function onConnect(event) {
        event.stopImmediatePropagation();
        initCache();
        const hostRef = event.detail;
        const host = getElement(event.detail);
        if (connector.provider === host)
          return;
        const name = host === null || host === void 0 ? void 0 : host.nodeName.toLowerCase().replace('vm-', '');
        writeTask(() => __awaiter$w(this, void 0, void 0, function* () {
          connector.provider = host;
          connector.currentProvider = Object.values(Provider).find(provider => name === provider);
          createStencilHook(hostRef, undefined, () => onDisconnect());
        }));
      }
      function onChange(event) {
        var _a;
        event.stopImmediatePropagation();
        const { by, prop, value } = event.detail;
        if (!isProviderWritableProp(prop)) {
          (_a = connector.logger) === null || _a === void 0 ? void 0 : _a.warn(`${by.nodeName} tried to change \`${prop}\` but it is readonly.`);
          return;
        }
        writeTask(() => {
          cache.set(prop, value);
          connector[prop] = value;
        });
      }
      createStencilHook(connector, () => {
        disposal.add(listen(el, PROVIDER_CONNECT_EVENT, onConnect));
        disposal.add(listen(el, PROVIDER_CHANGE_EVENT, onChange));
      }, () => {
        disposal.empty();
        cache.clear();
      });
    }
    function withProviderConnect(ref) {
      const connectEvent = buildProviderConnectEvent(PROVIDER_CONNECT_EVENT, ref);
      createStencilHook(ref, () => {
        getElement(ref).dispatchEvent(connectEvent);
      });
    }

    var __awaiter$v = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Audio = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        /**
         * @internal Whether an external SDK will attach itself to the media player and control it.
         */
        this.willAttach = false;
        /** @inheritdoc */
        this.preload = 'metadata';
        withComponentRegistry(this);
        if (!this.willAttach)
          withProviderConnect(this);
      }
      /** @internal */
      getAdapter() {
        var _a, _b;
        return __awaiter$v(this, void 0, void 0, function* () {
          const adapter = (_b = (yield ((_a = this.fileProvider) === null || _a === void 0 ? void 0 : _a.getAdapter()))) !== null && _b !== void 0 ? _b : {};
          adapter.canPlay = (type) => __awaiter$v(this, void 0, void 0, function* () { return isString(type) && audioRegex.test(type); });
          return adapter;
        });
      }
      render() {
        return (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        h("vm-file", { noConnect: true, willAttach: this.willAttach, crossOrigin: this.crossOrigin, preload: this.preload, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, viewType: ViewType.Audio, ref: (el) => {
            this.fileProvider = el;
          } }, h("slot", null)));
      }
    };

    const captionControlCss = ":host([hidden]){display:none}";

    var __awaiter$u = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const CaptionControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canToggleCaptionVisibility = false;
        /**
         * The URL to an SVG element or fragment to load.
         */
        this.showIcon = 'captions-on';
        /**
         * The URL to an SVG element or fragment to load.
         */
        this.hideIcon = 'captions-off';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @inheritdoc */
        this.keys = 'c';
        /** @internal */
        this.i18n = {};
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.textTracks = [];
        /** @internal */
        this.isTextTrackVisible = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'i18n',
          'textTracks',
          'isTextTrackVisible',
          'playbackReady',
        ]);
      }
      onTextTracksChange() {
        var _a;
        return __awaiter$u(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canToggleCaptionVisibility =
            this.textTracks.length > 0 &&
              ((_a = (yield (player === null || player === void 0 ? void 0 : player.canSetTextTrackVisibility()))) !== null && _a !== void 0 ? _a : false);
        });
      }
      componentDidLoad() {
        this.onTextTracksChange();
      }
      onClick() {
        var _a;
        const player = getPlayerFromRegistry(this);
        (_a = player === null || player === void 0 ? void 0 : player.setTextTrackVisibility) === null || _a === void 0 ? void 0 : _a.call(player, !this.isTextTrackVisible);
      }
      render() {
        const tooltip = this.isTextTrackVisible
          ? this.i18n.disableCaptions
          : this.i18n.enableCaptions;
        const tooltipWithHint = !isUndefined(this.keys)
          ? `${tooltip} (${this.keys})`
          : tooltip;
        return (h(Host, { hidden: !this.canToggleCaptionVisibility }, h("vm-control", { label: this.i18n.captions, keys: this.keys, hidden: !this.canToggleCaptionVisibility, pressed: this.isTextTrackVisible, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isTextTrackVisible ? this.showIcon : this.hideIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint))));
      }
      static get watchers() { return {
        "textTracks": ["onTextTracksChange"],
        "playbackReady": ["onTextTracksChange"]
      }; }
      static get style() { return captionControlCss; }
    };

    /* eslint-disable func-names */
    const watch$1 = new Set();
    const controls = new Set();
    // watchedEl -> (controlsEl -> controlsHeight) saved on collision. Basically keeps track of
    // every collision with all controls for each watched element.
    const collisions = new Map();
    function update() {
      writeTask(() => {
        controls.forEach(controlsEl => {
          const controlsHeight = parseFloat(window.getComputedStyle(controlsEl).height);
          watch$1.forEach(watchedEl => {
            const watchedElCollisions = collisions.get(watchedEl);
            const hasCollided = isColliding(watchedEl, controlsEl);
            const willCollide = isColliding(watchedEl, controlsEl, 0, controlsHeight) ||
              isColliding(watchedEl, controlsEl, 0, -controlsHeight);
            watchedElCollisions.set(controlsEl, hasCollided || willCollide ? controlsHeight : 0);
          });
        });
        // Update after assessing all collisions so there are no glitchy movements.
        watch$1.forEach(watchedEl => {
          const watchedElCollisions = collisions.get(watchedEl);
          watchedEl.style.setProperty('--vm-controls-height', `${Math.max(0, Math.max(...watchedElCollisions.values()))}px`);
        });
      });
    }
    function registerControlsForCollisionDetection(component) {
      const el = getElement(component);
      function getInnerEl() {
        return el.shadowRoot.querySelector('.controls');
      }
      createStencilHook(component, () => {
        const innerEl = getInnerEl();
        if (!isNull(innerEl)) {
          controls.add(innerEl);
          update();
        }
      }, () => {
        controls.delete(getInnerEl());
        update();
      });
      wrapStencilHook(component, 'componentDidLoad', () => {
        controls.add(getInnerEl());
        update();
      });
      wrapStencilHook(component, 'componentDidRender', update);
    }
    function withControlsCollisionDetection(component) {
      const el = getElement(component);
      createStencilHook(component, () => {
        watch$1.add(el);
        collisions.set(el, new Map());
        update();
      }, () => {
        watch$1.delete(el);
        collisions.delete(el);
      });
    }

    const captionsCss = ":host{position:absolute;left:0;bottom:0;width:100%;pointer-events:none;z-index:var(--vm-captions-z-index)}.captions{width:100%;text-align:center;color:var(--vm-captions-text-color);font-size:var(--vm-captions-font-size);padding:$control-spacing;display:none;pointer-events:none;transition:transform 0.4s ease-in-out, opacity 0.3s ease-in-out}.captions.enabled{display:inline-block}.captions.hidden{display:none !important}.captions.inactive{opacity:0;visibility:hidden}.captions.fontMd{font-size:var(--vm-captions-font-size-medium)}.captions.fontLg{font-size:var(--vm-captions-font-size-large)}.captions.fontXl{font-size:var(--vm-captions-font-size-xlarge)}.cue{display:inline-block;background:var(--vm-captions-cue-bg-color);border-radius:var(--vm-captions-cue-border-radius);box-decoration-break:clone;line-height:185%;padding:var(--vm-captions-cue-padding);white-space:pre-wrap;pointer-events:none}.cue>div{display:inline}.cue:empty{display:none}";

    var __awaiter$t = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Captions = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.sizeDisposal = new Disposal();
        this.textDisposal = new Disposal();
        this.isEnabled = false;
        this.fontSize = 'sm';
        /**
         * Whether the captions should be visible or not.
         */
        this.hidden = false;
        /** @internal */
        this.isControlsActive = false;
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.playbackStarted = false;
        /** @internal */
        this.textTracks = [];
        /** @internal */
        this.currentTextTrack = -1;
        /** @internal */
        this.isTextTrackVisible = true;
        withComponentRegistry(this);
        withControlsCollisionDetection(this);
        withPlayerContext(this, [
          'isVideoView',
          'playbackStarted',
          'isControlsActive',
          'textTracks',
          'currentTextTrack',
          'isTextTrackVisible',
        ]);
      }
      onEnabledChange() {
        this.isEnabled = this.playbackStarted && this.isVideoView;
      }
      onTextTracksChange() {
        const textTrack = this.textTracks[this.currentTextTrack];
        const renderCues = () => {
          var _a;
          const activeCues = Array.from((_a = textTrack.activeCues) !== null && _a !== void 0 ? _a : []);
          this.renderCurrentCue(activeCues[0]);
        };
        this.textDisposal.empty();
        if (!isNil(textTrack)) {
          renderCues();
          this.textDisposal.add(listen(textTrack, 'cuechange', renderCues));
        }
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.dispatch('shouldRenderNativeTextTracks', false);
        this.onTextTracksChange();
        this.onPlayerResize();
      }
      disconnectedCallback() {
        this.textDisposal.empty();
        this.sizeDisposal.empty();
        this.dispatch('shouldRenderNativeTextTracks', true);
      }
      onPlayerResize() {
        return __awaiter$t(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const container = (yield player.getContainer());
          const resizeObs = new ResizeObserver(entries => {
            const entry = entries[0];
            const { width } = entry.contentRect;
            if (width >= 1360) {
              this.fontSize = 'xl';
            }
            else if (width >= 1024) {
              this.fontSize = 'lg';
            }
            else if (width >= 768) {
              this.fontSize = 'md';
            }
            else {
              this.fontSize = 'sm';
            }
          });
          resizeObs.observe(container);
        });
      }
      renderCurrentCue(cue) {
        if (isNil(cue)) {
          this.cue = '';
          return;
        }
        const div = document.createElement('div');
        div.append(cue.getCueAsHTML());
        this.cue = div.innerHTML.trim();
      }
      render() {
        return (h("div", { style: {
            transform: `translateY(calc(${this.isControlsActive ? 'var(--vm-controls-height)' : '24px'} * -1))`,
          }, class: {
            captions: true,
            enabled: this.isEnabled,
            hidden: this.hidden,
            fontMd: this.fontSize === 'md',
            fontLg: this.fontSize === 'lg',
            fontXl: this.fontSize === 'xl',
            inactive: !this.isTextTrackVisible,
          } }, h("span", { class: "cue" }, this.cue)));
      }
      static get watchers() { return {
        "isVideoView": ["onEnabledChange"],
        "playbackStarted": ["onEnabledChange"],
        "textTracks": ["onTextTracksChange"],
        "currentTextTrack": ["onTextTracksChange"]
      }; }
      static get style() { return captionsCss; }
    };

    const clickToPlayCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-click-to-play-z-index)}.clickToPlay{display:none;width:100%;height:100%;pointer-events:none}.clickToPlay.enabled{display:inline-block;pointer-events:auto}";

    var __awaiter$s = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const ClickToPlay = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * By default this is disabled on mobile to not interfere with playback, set this to `true` to
         * enable it.
         */
        this.useOnMobile = false;
        /** @internal */
        this.paused = true;
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.isMobile = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['paused', 'isVideoView', 'isMobile']);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      /** @internal */
      forceClick() {
        return __awaiter$s(this, void 0, void 0, function* () {
          this.onClick();
        });
      }
      onClick() {
        this.dispatch('paused', !this.paused);
      }
      render() {
        return (h("div", { class: {
            clickToPlay: true,
            enabled: this.isVideoView && (!this.isMobile || this.useOnMobile),
          }, onClick: this.onClick.bind(this) }));
      }
      static get style() { return clickToPlayCss; }
    };

    const controlCss = "button{display:flex;align-items:center;flex-direction:row;border:var(--vm-control-border);cursor:pointer;flex-shrink:0;font-size:var(--vm-control-icon-size);color:var(--vm-control-color);background:var(--vm-control-bg, transparent);border-radius:var(--vm-control-border-radius);padding:var(--vm-control-padding);position:relative;pointer-events:auto;transition:all 0.3s ease;transform:scale(var(--vm-control-scale, 1));touch-action:manipulation;box-sizing:border-box}button.hidden{display:none}button:focus{outline:0}button.tapHighlight{background:var(--vm-control-tap-highlight)}button.notTouch:focus,button.notTouch:hover,button.notTouch[aria-expanded='true']{background:var(--vm-control-focus-bg);color:var(--vm-control-focus-color);transform:scale(calc(var(--vm-control-scale, 1) + 0.06))}";

    var __awaiter$r = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Control = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmInteractionChange = createEvent(this, "vmInteractionChange", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.keyboardDisposal = new Disposal();
        this.showTapHighlight = false;
        /**
         * Whether the control should be displayed or not.
         */
        this.hidden = false;
        /** @internal */
        this.isTouch = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isTouch']);
      }
      onKeysChange() {
        return __awaiter$r(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (isUndefined(this.keys))
            return;
          const player = yield findPlayer(this);
          const codes = this.keys.split('/');
          if (isUndefined(player))
            return;
          this.keyboardDisposal.add(listen(player, 'keydown', (event) => {
            if (codes.includes(event.key)) {
              this.button.click();
            }
          }));
        });
      }
      connectedCallback() {
        this.findTooltip();
        this.onKeysChange();
      }
      componentWillLoad() {
        this.findTooltip();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      /**
       * Focuses the control.
       */
      focusControl() {
        var _a;
        return __awaiter$r(this, void 0, void 0, function* () {
          (_a = this.button) === null || _a === void 0 ? void 0 : _a.focus();
        });
      }
      /**
       * Removes focus from the control.
       */
      blurControl() {
        var _a;
        return __awaiter$r(this, void 0, void 0, function* () {
          (_a = this.button) === null || _a === void 0 ? void 0 : _a.blur();
        });
      }
      onTouchStart() {
        this.showTapHighlight = true;
      }
      onTouchEnd() {
        setTimeout(() => {
          this.showTapHighlight = false;
        }, 100);
      }
      findTooltip() {
        const tooltip = this.host.querySelector('vm-tooltip');
        if (!isNull(tooltip))
          this.describedBy = tooltip.id;
        return tooltip;
      }
      onShowTooltip() {
        const tooltip = this.findTooltip();
        if (!isNull(tooltip))
          tooltip.active = true;
        this.vmInteractionChange.emit(true);
      }
      onHideTooltip() {
        const tooltip = this.findTooltip();
        if (!isNull(tooltip))
          tooltip.active = false;
        this.button.blur();
        this.vmInteractionChange.emit(false);
      }
      onFocus() {
        this.vmFocus.emit();
        this.onShowTooltip();
      }
      onBlur() {
        this.vmBlur.emit();
        this.onHideTooltip();
      }
      onMouseEnter() {
        this.onShowTooltip();
      }
      onMouseLeave() {
        this.onHideTooltip();
      }
      render() {
        const isMenuExpanded = this.expanded ? 'true' : 'false';
        const isPressed = this.pressed ? 'true' : 'false';
        return (h("button", { class: {
            hidden: this.hidden,
            notTouch: !this.isTouch,
            tapHighlight: this.showTapHighlight,
          }, id: this.identifier, type: "button", "aria-label": this.label, "aria-haspopup": !isUndefined(this.menu) ? 'true' : undefined, "aria-controls": this.menu, "aria-expanded": !isUndefined(this.menu) ? isMenuExpanded : undefined, "aria-pressed": !isUndefined(this.pressed) ? isPressed : undefined, "aria-hidden": this.hidden ? 'true' : 'false', "aria-describedby": this.describedBy, onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onMouseEnter: this.onMouseEnter.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: (el) => {
            this.button = el;
          } }, h("slot", null)));
      }
      get host() { return this; }
      static get watchers() { return {
        "keys": ["onKeysChange"]
      }; }
      static get style() { return controlCss; }
    };

    const controlGroupCss = ":host{width:100%}.controlGroup{position:relative;width:100%;display:flex;flex-wrap:wrap;flex-direction:inherit;align-items:inherit;justify-content:inherit;box-sizing:border-box}.controlGroup.spaceTop{margin-top:var(--vm-control-group-spacing)}.controlGroup.spaceBottom{margin-bottom:var(--vm-control-group-spacing)}::slotted(*){margin-left:var(--vm-controls-spacing)}::slotted(*:first-child){margin-left:0}";

    const ControlNewLine = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * Determines where to add spacing/margin. The amount of spacing is determined by the CSS variable
         * `--control-group-spacing`.
         */
        this.space = 'none';
        withComponentRegistry(this);
      }
      render() {
        return (h("div", { class: {
            controlGroup: true,
            spaceTop: this.space !== 'none' && this.space !== 'bottom',
            spaceBottom: this.space !== 'none' && this.space !== 'top',
          } }, h("slot", null)));
      }
      get host() { return this; }
      static get style() { return controlGroupCss; }
    };

    const controlSpacerCss = ":host{flex:1}";

    const ControlSpacer = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        withComponentRegistry(this);
      }
      static get style() { return controlSpacerCss; }
    };

    const debounce = (func, wait = 1000, immediate = false) => {
      let timeout;
      return function executedFunction(...args) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        const later = function delayedFunctionCall() {
          timeout = undefined;
          if (!immediate)
            func.apply(context, args);
        };
        const callNow = immediate && isUndefined(timeout);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow)
          func.apply(context, args);
      };
    };

    const controlsCss = ":host{position:relative;width:100%;z-index:var(--vm-controls-z-index)}:host([video]){position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}.controls{display:flex;width:100%;position:absolute;flex-wrap:wrap;pointer-events:auto;box-sizing:border-box;background:var(--vm-controls-bg);padding:var(--vm-controls-padding);border-radius:var(--vm-controls-border-radius);opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.controls.audio{position:relative}.controls.hidden{display:none}.controls.active{opacity:1;visibility:visible}.controls.fullWidth{width:100%}.controls.fullHeight{height:100%}::slotted(*:not(vm-control-group)){margin-left:var(--vm-controls-spacing)}::slotted(*:not(vm-control-group):first-child){margin-left:0}";

    var __awaiter$q = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * We want to keep the controls active state in-sync per player.
     */
    const playerRef = {};
    const hideControlsTimeout = {};
    const Controls = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.disposal = new Disposal();
        this.isInteracting = false;
        /**
         * Whether the controls are visible or not.
         */
        this.hidden = false;
        /**
         * Whether the controls container should be 100% width. This has no effect if the view is of
         * type `audio`.
         */
        this.fullWidth = false;
        /**
         * Whether the controls container should be 100% height. This has no effect if the view is of
         * type `audio`.
         */
        this.fullHeight = false;
        /**
         * Sets the `flex-direction` property that manages the direction in which the controls are layed
         * out.
         */
        this.direction = 'row';
        /**
         * Sets the `align-items` flex property that aligns the individual controls on the cross-axis.
         */
        this.align = 'center';
        /**
         * Sets the `justify-content` flex property that aligns the individual controls on the main-axis.
         */
        this.justify = 'start';
        /**
         * Pins the controls to the defined position inside the video player. This has no effect when
         * the view is of type `audio`.
         */
        this.pin = 'bottomLeft';
        /**
         * The length in milliseconds that the controls are active for before fading out. Audio players
         * are not effected by this prop.
         */
        this.activeDuration = 2750;
        /**
         * Whether the controls should wait for playback to start before being shown. Audio players
         * are not effected by this prop.
         */
        this.waitForPlaybackStart = false;
        /**
         * Whether the controls should show/hide when paused. Audio players are not effected by this prop.
         */
        this.hideWhenPaused = false;
        /**
         * Whether the controls should hide when the mouse leaves the player. Audio players are not
         * effected by this prop.
         */
        this.hideOnMouseLeave = false;
        /** @internal */
        this.isAudioView = false;
        /** @internal */
        this.isSettingsActive = false;
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.isControlsActive = false;
        /** @internal */
        this.paused = true;
        /** @internal */
        this.playbackStarted = false;
        withComponentRegistry(this);
        registerControlsForCollisionDetection(this);
        withPlayerContext(this, [
          'playbackReady',
          'isAudioView',
          'isControlsActive',
          'isSettingsActive',
          'paused',
          'playbackStarted',
        ]);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.onControlsChange();
        this.setupPlayerListeners();
      }
      componentWillLoad() {
        this.onControlsChange();
      }
      disconnectedCallback() {
        this.disposal.empty();
        delete hideControlsTimeout[playerRef[this]];
        delete playerRef[this];
      }
      setupPlayerListeners() {
        return __awaiter$q(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const events = ['focus', 'keydown', 'click', 'touchstart', 'mouseleave'];
          events.forEach(event => {
            this.disposal.add(listen(player, event, this.onControlsChange.bind(this)));
          });
          this.disposal.add(listen(player, 'mousemove', debounce(this.onControlsChange, 50, true).bind(this)));
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          playerRef[this] = player;
        });
      }
      show() {
        this.dispatch('isControlsActive', true);
      }
      hide() {
        this.dispatch('isControlsActive', false);
      }
      hideWithDelay() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clearTimeout(hideControlsTimeout[playerRef[this]]);
        hideControlsTimeout[playerRef[this]] = setTimeout(() => {
          this.hide();
        }, this.activeDuration);
      }
      onControlsChange(event) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        clearTimeout(hideControlsTimeout[playerRef[this]]);
        if (this.hidden || !this.playbackReady) {
          this.hide();
          return;
        }
        if (this.isAudioView) {
          this.show();
          return;
        }
        if (this.waitForPlaybackStart && !this.playbackStarted) {
          this.hide();
          return;
        }
        if (this.isInteracting || this.isSettingsActive) {
          this.show();
          return;
        }
        if (this.hideWhenPaused && this.paused) {
          this.hideWithDelay();
          return;
        }
        if (this.hideOnMouseLeave && !this.paused && (event === null || event === void 0 ? void 0 : event.type) === 'mouseleave') {
          this.hide();
          return;
        }
        if (!this.paused) {
          this.show();
          this.hideWithDelay();
          return;
        }
        this.show();
      }
      getPosition() {
        if (this.isAudioView)
          return {};
        if (this.pin === 'center') {
          return {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          };
        }
        // topLeft => { top: 0, left: 0 }
        const pos = this.pin.split(/(?=[L|R])/).map(s => s.toLowerCase());
        return { [pos[0]]: 0, [pos[1]]: 0 };
      }
      onStartInteraction() {
        this.isInteracting = true;
      }
      onEndInteraction() {
        this.isInteracting = false;
      }
      render() {
        return (h(Host, { video: !this.isAudioView }, h("div", { style: Object.assign(Object.assign({}, this.getPosition()), { flexDirection: this.direction, alignItems: this.align === 'center' ? 'center' : `flex-${this.align}`, justifyContent: this.justify }), class: {
            controls: true,
            audio: this.isAudioView,
            hidden: this.hidden,
            active: this.playbackReady && this.isControlsActive,
            fullWidth: this.isAudioView || this.fullWidth,
            fullHeight: !this.isAudioView && this.fullHeight,
          }, onMouseEnter: this.onStartInteraction.bind(this), onMouseLeave: this.onEndInteraction.bind(this), onTouchStart: this.onStartInteraction.bind(this), onTouchEnd: this.onEndInteraction.bind(this) }, h("slot", null))));
      }
      static get watchers() { return {
        "paused": ["onControlsChange"],
        "hidden": ["onControlsChange"],
        "isAudioView": ["onControlsChange"],
        "isInteracting": ["onControlsChange"],
        "isSettingsActive": ["onControlsChange"],
        "hideWhenPaused": ["onControlsChange"],
        "hideOnMouseLeave": ["onControlsChange"],
        "playbackStarted": ["onControlsChange"],
        "waitForPlaybackStart": ["onControlsChange"],
        "playbackReady": ["onControlsChange"]
      }; }
      static get style() { return controlsCss; }
    };

    const currentTimeCss = ":host{display:flex;align-items:center;justify-content:center}";

    const CurrentTime = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.currentTime = 0;
        /** @internal */
        this.i18n = {};
        /**
         * Whether the time should always show the hours unit, even if the time is less than
         * 1 hour (eg: `20:35` -> `00:20:35`).
         */
        this.alwaysShowHours = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['currentTime', 'i18n']);
      }
      render() {
        return (h("vm-time", { label: this.i18n.currentTime, seconds: this.currentTime, alwaysShowHours: this.alwaysShowHours }));
      }
      static get style() { return currentTimeCss; }
    };

    var _a, _b;
    const IS_CLIENT = typeof window !== 'undefined';
    const UA = IS_CLIENT ? (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent.toLowerCase() : '';
    const IS_IOS = /iphone|ipad|ipod|ios|CriOS|FxiOS/.test(UA);
    const IS_ANDROID = /android/.test(UA);
    const IS_MOBILE = IS_CLIENT && (IS_IOS || IS_ANDROID);
    const IS_IPHONE = IS_CLIENT && /(iPhone|iPod)/gi.test((_b = window.navigator) === null || _b === void 0 ? void 0 : _b.platform);
    /firefox/.test(UA);
    const IS_CHROME = IS_CLIENT && window.chrome;
    IS_CLIENT &&
      !IS_CHROME &&
      (window.safari || IS_IOS || /(apple|safari)/.test(UA));
    const onMobileChange = (callback) => {
      if (!IS_CLIENT || isUndefined(window.ResizeObserver)) {
        callback(IS_MOBILE);
        return noop;
      }
      function onResize() {
        callback(window.innerWidth <= 480 || IS_MOBILE);
      }
      callback(window.innerWidth <= 480 || IS_MOBILE);
      return listen(window, 'resize', onResize);
    };
    const onTouchInputChange = (callback) => {
      if (!IS_CLIENT)
        return noop;
      let lastTouchTime = 0;
      const offTouchListener = listen(document, 'touchstart', () => {
        lastTouchTime = new Date().getTime();
        callback(true);
      }, true);
      const offMouseListener = listen(document, 'mousemove', () => {
        // Filter emulated events coming from touch events
        if (new Date().getTime() - lastTouchTime < 500)
          return;
        callback(false);
      }, true);
      return () => {
        offTouchListener();
        offMouseListener();
      };
    };
    /**
     * Checks if the screen orientation can be changed.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
     */
    const canRotateScreen = () => IS_CLIENT && window.screen.orientation && !!window.screen.orientation.lock;
    /**
     * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
     * the Chrome browser.
     *
     * @see  https://developers.google.com/web/updates/2018/10/watch-video-using-picture-in-picture
     */
    const canUsePiPInChrome = () => {
      if (!IS_CLIENT)
        return false;
      const video = document.createElement('video');
      return !!document.pictureInPictureEnabled && !video.disablePictureInPicture;
    };
    /**
     * Checks if the native HTML5 video player can enter picture-in-picture (PIP) mode when using
     * the desktop Safari browser, iOS Safari appears to "support" PiP through the check, however PiP
     * does not function.
     *
     * @see https://developer.apple.com/documentation/webkitjs/adding_picture_in_picture_to_your_safari_media_controls
     */
    const canUsePiPInSafari = () => {
      if (!IS_CLIENT)
        return false;
      const video = document.createElement('video');
      return (isFunction(video.webkitSupportsPresentationMode) &&
        isFunction(video.webkitSetPresentationMode) &&
        !IS_IPHONE);
    };
    // Checks if the native HTML5 video player can enter PIP.
    const canUsePiP = () => canUsePiPInChrome() || canUsePiPInSafari();
    /**
     * To detect autoplay, we create a video element and call play on it, if it is `paused` after
     * a `play()` call, autoplay is supported. Although this unintuitive, it works across browsers
     * and is currently the lightest way to detect autoplay without using a data source.
     *
     * @see https://github.com/ampproject/amphtml/blob/9bc8756536956780e249d895f3e1001acdee0bc0/src/utils/video.js#L25
     */
    const canAutoplay = (muted = true, playsinline = true) => {
      if (!IS_CLIENT)
        return Promise.resolve(false);
      const video = document.createElement('video');
      if (muted) {
        video.setAttribute('muted', '');
        video.muted = true;
      }
      if (playsinline) {
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
      }
      video.setAttribute('height', '0');
      video.setAttribute('width', '0');
      video.style.position = 'fixed';
      video.style.top = '0';
      video.style.width = '0';
      video.style.height = '0';
      video.style.opacity = '0';
      // Promise wrapped this way to catch both sync throws and async rejections.
      // More info: https://github.com/tc39/proposal-promise-try
      new Promise(resolve => resolve(video.play())).catch(noop);
      return Promise.resolve(!video.paused);
    };

    /**
     * Attempt to parse json into a POJO.
     */
    function tryParseJSON(json) {
      if (!isString(json))
        return undefined;
      try {
        return JSON.parse(json);
      }
      catch (e) {
        return undefined;
      }
    }
    /**
     * Check if the given input is json or a plain object.
     */
    const isObjOrJSON = (input) => !isNil(input) &&
      (isObject(input) || (isString(input) && input.startsWith('{')));
    /**
     * If an object return otherwise try to parse it as json.
     */
    const objOrParseJSON = (input) => isObject(input) ? input : tryParseJSON(input);
    /**
     * Load image avoiding xhr/fetch CORS issues. Server status can't be obtained this way
     * unfortunately, so this uses "naturalWidth" to determine if the image has been loaded. By
     * default it checks if it is at least 1px.
     */
    const loadImage = (src, minWidth = 1) => new Promise((resolve, reject) => {
      const image = new Image();
      const handler = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete image.onload;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete image.onerror;
        image.naturalWidth >= minWidth ? resolve(image) : reject(image);
      };
      Object.assign(image, { onload: handler, onerror: handler, src });
    });
    const loadScript = (src, onLoad, onError = noop) => {
      var _a;
      const script = document.createElement('script');
      script.src = src;
      script.onload = onLoad;
      script.onerror = onError;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      (_a = firstScriptTag.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(script, firstScriptTag);
    };
    /**
     * Tries to parse json and return a object.
     */
    const decodeJSON = (data) => {
      if (!isObjOrJSON(data))
        return undefined;
      return objOrParseJSON(data);
    };
    /**
     * Attempts to safely decode a URI component, on failure it returns the given fallback.
     */
    const tryDecodeURIComponent = (component, fallback = '') => {
      if (!IS_CLIENT)
        return fallback;
      try {
        return window.decodeURIComponent(component);
      }
      catch (e) {
        return fallback;
      }
    };
    /**
     * Returns a simple key/value map and duplicate keys are merged into an array.
     *
     * @see https://github.com/ampproject/amphtml/blob/c7c46cec71bac92f5c5da31dcc6366c18577f566/src/url-parse-query-string.js#L31
     */
    const QUERY_STRING_REGEX = /(?:^[#?]?|&)([^=&]+)(?:=([^&]*))?/g;
    const parseQueryString = (qs) => {
      const params = Object.create(null);
      if (isUndefined(qs))
        return params;
      let match;
      // eslint-disable-next-line no-cond-assign
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      while ((match = QUERY_STRING_REGEX.exec(qs))) {
        const name = tryDecodeURIComponent(match[1], match[1]).replace('[]', '');
        const value = isString(match[2])
          ? tryDecodeURIComponent(match[2].replace(/\+/g, ' '), match[2])
          : '';
        const currValue = params[name];
        if (currValue && !isArray(currValue))
          params[name] = [currValue];
        currValue ? params[name].push(value) : (params[name] = value);
      }
      return params;
    };
    /**
     * Serializes the given params into a query string.
     */
    const serializeQueryString = (params) => {
      const qs = [];
      const appendQueryParam = (param, v) => {
        qs.push(`${encodeURIComponent(param)}=${encodeURIComponent(v)}`);
      };
      Object.keys(params).forEach(param => {
        const value = params[param];
        if (isNil(value))
          return;
        if (isArray(value)) {
          value.forEach((v) => appendQueryParam(param, v));
        }
        else {
          appendQueryParam(param, value);
        }
      });
      return qs.join('&');
    };
    /**
     * Notifies the browser to start establishing a connection with the given URL.
     */
    const preconnect = (url, rel = 'preconnect', as) => {
      if (!IS_CLIENT)
        return false;
      const link = document.createElement('link');
      link.rel = rel;
      link.href = url;
      if (!isUndefined(as))
        link.as = as;
      link.crossOrigin = 'true';
      document.head.append(link);
      return true;
    };
    /**
     * Safely appends the given query string to the given URL.
     */
    const appendQueryStringToURL = (url, qs) => {
      if (isUndefined(qs) || qs.length === 0)
        return url;
      const mainAndQuery = url.split('?', 2);
      return (mainAndQuery[0] +
        (!isUndefined(mainAndQuery[1]) ? `?${mainAndQuery[1]}&${qs}` : `?${qs}`));
    };
    /**
     * Serializes the given params into a query string and appends them to the given URL.
     */
    const appendParamsToURL = (url, params) => appendQueryStringToURL(url, isObject(params)
      ? serializeQueryString(params)
      : params);
    /**
     * Tries to convert a query string into a object.
     */
    const decodeQueryString = (qs) => {
      if (!isString(qs))
        return undefined;
      return parseQueryString(qs);
    };
    const pendingSDKRequests = {};
    /**
     * Loads an SDK into the global window namespace.
     *
     * @see https://github.com/CookPete/react-player/blob/master/src/utils.js#L77
     */
    const loadSDK = (url, sdkGlobalVar, sdkReadyVar, isLoaded = () => true, loadScriptFn = loadScript) => {
      const getGlobal = (key) => {
        if (!isUndefined(window[key]))
          return window[key];
        if (window.exports && window.exports[key])
          return window.exports[key];
        if (window.module && window.module.exports && window.module.exports[key]) {
          return window.module.exports[key];
        }
        return undefined;
      };
      const existingGlobal = getGlobal(sdkGlobalVar);
      if (existingGlobal && isLoaded(existingGlobal)) {
        return Promise.resolve(existingGlobal);
      }
      return new Promise((resolve, reject) => {
        if (!isUndefined(pendingSDKRequests[url])) {
          pendingSDKRequests[url].push({ resolve, reject });
          return;
        }
        pendingSDKRequests[url] = [{ resolve, reject }];
        const onLoaded = (sdk) => {
          pendingSDKRequests[url].forEach(request => request.resolve(sdk));
        };
        if (!isUndefined(sdkReadyVar)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const previousOnReady = window[sdkReadyVar];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          window[sdkReadyVar] = function () {
            if (!isUndefined(previousOnReady))
              previousOnReady();
            onLoaded(getGlobal(sdkGlobalVar));
          };
        }
        loadScriptFn(url, () => {
          if (isUndefined(sdkReadyVar))
            onLoaded(getGlobal(sdkGlobalVar));
        }, e => {
          pendingSDKRequests[url].forEach(request => {
            request.reject(e);
          });
          delete pendingSDKRequests[url];
        });
      });
    };

    const withProviderContext = (provider, additionalProps = []) => withPlayerContext(provider, [
      'autoplay',
      'controls',
      'language',
      'muted',
      'logger',
      'loop',
      'aspectRatio',
      'playsinline',
      ...additionalProps,
    ]);

    const dailymotionCss = ":host{z-index:var(--vm-media-z-index)}";

    var __awaiter$p = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const videoInfoCache$1 = new Map();
    const Dailymotion = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.defaultInternalState = {};
        this.internalState = {
          currentTime: 0,
          volume: 0,
          muted: false,
          isAdsPlaying: false,
          playbackReady: false,
        };
        this.embedSrc = '';
        this.mediaTitle = '';
        /**
         * Whether to automatically play the next video in the queue.
         */
        this.shouldAutoplayQueue = false;
        /**
         * Whether to show the 'Up Next' queue.
         */
        this.showUpNextQueue = false;
        /**
         * Whether to show buttons for sharing the video.
         */
        this.showShareButtons = false;
        /**
         * Whether to display the Dailymotion logo.
         */
        this.showDailymotionLogo = false;
        /**
         * Whether to show video information (title and owner) on the start screen.
         */
        this.showVideoInfo = true;
        /** @internal */
        this.language = 'en';
        /** @internal */
        this.autoplay = false;
        /** @internal */
        this.controls = false;
        /** @internal */
        this.loop = false;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        this.internalState = Object.assign({}, this.defaultInternalState);
        if (!this.videoId) {
          this.embedSrc = '';
          return;
        }
        this.embedSrc = `${this.getOrigin()}/embed/video/${this.videoId}?api=1`;
        this.fetchVideoInfo = this.getVideoInfo();
        this.pendingMediaTitleCall = deferredPromise();
      }
      onControlsChange() {
        if (this.internalState.playbackReady) {
          this.remoteControl("controls" /* Controls */, this.controls);
        }
      }
      onCustomPosterChange() {
        this.dispatch('currentPoster', this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch('viewType', ViewType.Video);
        this.onVideoIdChange();
        this.internalState.muted = this.muted;
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentDidLoad() {
        this.initialMuted = this.muted;
      }
      getOrigin() {
        return 'https://www.dailymotion.com';
      }
      getPreconnections() {
        return [this.getOrigin(), 'https://static1.dmcdn.net'];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          command,
          parameters: arg ? [arg] : [],
        });
      }
      buildParams() {
        return {
          autoplay: this.autoplay,
          mute: this.initialMuted,
          controls: this.controls,
          'queue-autoplay-next': this.shouldAutoplayQueue,
          'queue-enable': this.showUpNextQueue,
          'sharing-enable': this.showShareButtons,
          syndication: this.syndication,
          'ui-highlight': this.color,
          'ui-logo': this.showDailymotionLogo,
          'ui-start-screen-info': this.showVideoInfo,
        };
      }
      getVideoInfo() {
        return __awaiter$p(this, void 0, void 0, function* () {
          if (videoInfoCache$1.has(this.videoId))
            return videoInfoCache$1.get(this.videoId);
          const apiEndpoint = 'https://api.dailymotion.com';
          return window
            .fetch(`${apiEndpoint}/video/${this.videoId}?fields=duration,thumbnail_1080_url`)
            .then(response => response.json())
            .then(data => {
            const poster = data.thumbnail_1080_url;
            const duration = parseFloat(data.duration);
            videoInfoCache$1.set(this.videoId, { poster, duration });
            return { poster, duration };
          });
        });
      }
      onEmbedSrcChange() {
        this.vmLoadStart.emit();
        this.dispatch('viewType', ViewType.Video);
      }
      onEmbedMessage(event) {
        var _a, _b;
        const msg = event.detail;
        switch (msg.event) {
          case "playback_ready" /* PlaybackReady */:
            this.onControlsChange();
            this.dispatch('currentSrc', this.embedSrc);
            this.dispatch('mediaType', MediaType.Video);
            Promise.all([
              this.fetchVideoInfo,
              (_a = this.pendingMediaTitleCall) === null || _a === void 0 ? void 0 : _a.promise,
            ]).then(([info, mediaTitle]) => {
              var _a, _b;
              this.dispatch('duration', (_a = info === null || info === void 0 ? void 0 : info.duration) !== null && _a !== void 0 ? _a : -1);
              this.dispatch('currentPoster', (_b = this.poster) !== null && _b !== void 0 ? _b : info === null || info === void 0 ? void 0 : info.poster);
              this.dispatch('mediaTitle', mediaTitle);
              this.dispatch('playbackReady', true);
            });
            break;
          case "videochange" /* VideoChange */:
            (_b = this.pendingMediaTitleCall) === null || _b === void 0 ? void 0 : _b.resolve(msg.title);
            break;
          case "start" /* Start */:
            this.dispatch('paused', false);
            this.dispatch('playbackStarted', true);
            this.dispatch('buffering', true);
            break;
          case "video_start" /* VideoStart */:
            // Commands don't go through until ads have finished, so we store them and then replay them
            // once the video starts.
            this.remoteControl("muted" /* Muted */, this.internalState.muted);
            this.remoteControl("volume" /* Volume */, this.internalState.volume);
            if (this.internalState.currentTime > 0) {
              this.remoteControl("seek" /* Seek */, this.internalState.currentTime);
            }
            break;
          case "play" /* Play */:
            this.dispatch('paused', false);
            break;
          case "pause" /* Pause */:
            this.dispatch('paused', true);
            this.dispatch('playing', false);
            this.dispatch('buffering', false);
            break;
          case "playing" /* Playing */:
            this.dispatch('playing', true);
            this.dispatch('buffering', false);
            break;
          case "video_end" /* VideoEnd */:
            if (this.loop) {
              setTimeout(() => {
                this.remoteControl("play" /* Play */);
              }, 300);
            }
            else {
              this.dispatch('playbackEnded', true);
            }
            break;
          case "timeupdate" /* TimeUpdate */:
            this.dispatch('currentTime', parseFloat(msg.time));
            break;
          case "volumechange" /* VolumeChange */:
            this.dispatch('muted', msg.muted === 'true');
            this.dispatch('volume', Math.floor(parseFloat(msg.volume) * 100));
            break;
          case "seeking" /* Seeking */:
            this.dispatch('currentTime', parseFloat(msg.time));
            this.dispatch('seeking', true);
            break;
          case "seeked" /* Seeked */:
            this.dispatch('currentTime', parseFloat(msg.time));
            this.dispatch('seeking', false);
            break;
          case "waiting" /* Waiting */:
            this.dispatch('buffering', true);
            break;
          case "progress" /* Progress */:
            this.dispatch('buffered', parseFloat(msg.time));
            break;
          case "durationchange" /* DurationChange */:
            this.dispatch('duration', parseFloat(msg.duration));
            break;
          case "qualitiesavailable" /* QualitiesAvailable */:
            this.dispatch('playbackQualities', msg.qualities.map((q) => `${q}p`));
            break;
          case "qualitychange" /* QualityChange */:
            this.dispatch('playbackQuality', `${msg.quality}p`);
            break;
          case "fullscreenchange" /* FullscreenChange */:
            this.dispatch('isFullscreenActive', msg.fullscreen === 'true');
            break;
          case "error" /* Error */:
            this.vmError.emit(msg.error);
            break;
        }
      }
      /** @internal */
      getAdapter() {
        return __awaiter$p(this, void 0, void 0, function* () {
          const canPlayRegex = /(?:dai\.ly|dailymotion|dailymotion\.com)\/(?:video\/|embed\/|)(?:video\/|)((?:\w)+)/;
          return {
            getInternalPlayer: () => __awaiter$p(this, void 0, void 0, function* () { return this.embed; }),
            play: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("play" /* Play */);
            }),
            pause: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("pause" /* Pause */);
            }),
            canPlay: (type) => __awaiter$p(this, void 0, void 0, function* () { return isString(type) && canPlayRegex.test(type); }),
            setCurrentTime: (time) => __awaiter$p(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.internalState.currentTime = time;
                this.remoteControl("seek" /* Seek */, time);
              }
            }),
            setMuted: (muted) => __awaiter$p(this, void 0, void 0, function* () {
              this.internalState.muted = muted;
              this.remoteControl("muted" /* Muted */, muted);
            }),
            setVolume: (volume) => __awaiter$p(this, void 0, void 0, function* () {
              this.internalState.volume = volume / 100;
              this.dispatch('volume', volume);
              this.remoteControl("volume" /* Volume */, volume / 100);
            }),
            canSetPlaybackQuality: () => __awaiter$p(this, void 0, void 0, function* () { return true; }),
            setPlaybackQuality: (quality) => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("quality" /* Quality */, quality.slice(0, -1));
            }),
            canSetFullscreen: () => __awaiter$p(this, void 0, void 0, function* () { return true; }),
            enterFullscreen: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("fullscreen" /* Fullscreen */, true);
            }),
            exitFullscreen: () => __awaiter$p(this, void 0, void 0, function* () {
              this.remoteControl("fullscreen" /* Fullscreen */, false);
            }),
          };
        });
      }
      render() {
        return (h("vm-embed", { embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeQueryString, preconnections: this.getPreconnections(), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
            this.embed = el;
          } }));
      }
      static get watchers() { return {
        "videoId": ["onVideoIdChange"],
        "controls": ["onControlsChange"],
        "poster": ["onCustomPosterChange"]
      }; }
      static get style() { return dailymotionCss; }
    };

    const dashCss = ":host{z-index:var(--vm-media-z-index)}";

    var __awaiter$o = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Dash = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.textTracksDisposal = new Disposal();
        this.hasAttached = false;
        /**
         * The NPM package version of the `dashjs` library to download and use.
         */
        this.version = 'latest';
        /**
         * The `dashjs` configuration.
         */
        this.config = {};
        /** @internal */
        this.autoplay = false;
        /** @inheritdoc */
        this.preload = 'metadata';
        /**
         * Are text tracks enabled by default.
         */
        this.enableTextTracksByDefault = true;
        /** @internal */
        this.shouldRenderNativeTextTracks = true;
        /** @internal */
        this.isTextTrackVisible = true;
        /** @internal */
        this.currentTextTrack = -1;
        withComponentRegistry(this);
        withProviderConnect(this);
        withPlayerContext(this, [
          'autoplay',
          'shouldRenderNativeTextTracks',
          'isTextTrackVisible',
          'currentTextTrack',
        ]);
      }
      onSrcChange() {
        var _a;
        if (!this.hasAttached)
          return;
        this.vmLoadStart.emit();
        (_a = this.dash) === null || _a === void 0 ? void 0 : _a.attachSource(this.src);
      }
      onShouldRenderNativeTextTracks() {
        var _a;
        if (this.shouldRenderNativeTextTracks) {
          this.textTracksDisposal.empty();
        }
        else {
          this.hideCurrentTextTrack();
        }
        (_a = this.dash) === null || _a === void 0 ? void 0 : _a.enableForcedTextStreaming(!this.shouldRenderNativeTextTracks);
      }
      onTextTrackChange() {
        var _a, _b;
        if (!this.shouldRenderNativeTextTracks || isUndefined(this.dash))
          return;
        this.dash.setTextTrack(!this.isTextTrackVisible ? -1 : this.currentTextTrack);
        if (!this.isTextTrackVisible) {
          const track = Array.from((_b = (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.textTracks) !== null && _b !== void 0 ? _b : [])[this.currentTextTrack];
          if ((track === null || track === void 0 ? void 0 : track.mode) === 'hidden')
            this.dispatch('currentTextTrack', -1);
        }
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        if (this.mediaEl)
          this.setupDash();
      }
      disconnectedCallback() {
        this.textTracksDisposal.empty();
        this.destroyDash();
      }
      setupDash() {
        return __awaiter$o(this, void 0, void 0, function* () {
          try {
            const url = this.libSrc ||
              `https://cdn.jsdelivr.net/npm/dashjs@${this.version}/dist/dash.all.min.js`;
            const DashSDK = (yield loadSDK(url, 'dashjs'));
            this.dash = DashSDK.MediaPlayer(this.config).create();
            this.dash.initialize(this.mediaEl, null, this.autoplay);
            this.dash.setTextDefaultEnabled(this.enableTextTracksByDefault);
            this.dash.enableForcedTextStreaming(!this.shouldRenderNativeTextTracks);
            this.dash.on(DashSDK.MediaPlayer.events.PLAYBACK_METADATA_LOADED, () => {
              this.dispatch('mediaType', MediaType.Video);
              this.dispatch('currentSrc', this.src);
              this.dispatchLevels();
              this.listenToTextTracksForChanges();
              this.dispatch('playbackReady', true);
            });
            this.dash.on(DashSDK.MediaPlayer.events.TRACK_CHANGE_RENDERED, () => {
              if (!this.shouldRenderNativeTextTracks)
                this.hideCurrentTextTrack();
            });
            this.dash.on(DashSDK.MediaPlayer.events.ERROR, (e) => {
              this.vmError.emit(e);
            });
            this.hasAttached = true;
          }
          catch (e) {
            this.vmError.emit(e);
          }
        });
      }
      destroyDash() {
        var _a;
        return __awaiter$o(this, void 0, void 0, function* () {
          (_a = this.dash) === null || _a === void 0 ? void 0 : _a.reset();
          this.hasAttached = false;
        });
      }
      onMediaElChange(event) {
        return __awaiter$o(this, void 0, void 0, function* () {
          this.destroyDash();
          if (isUndefined(event.detail))
            return;
          this.mediaEl = event.detail;
          yield this.setupDash();
        });
      }
      levelToPlaybackQuality(level) {
        return level === -1 ? 'Auto' : `${level.height}p`;
      }
      findLevelIndexFromQuality(quality) {
        return this.dash
          .getBitrateInfoListFor('video')
          .findIndex((level) => this.levelToPlaybackQuality(level) === quality);
      }
      dispatchLevels() {
        try {
          const levels = this.dash.getBitrateInfoListFor('video');
          if ((levels === null || levels === void 0 ? void 0 : levels.length) > 0) {
            this.dispatch('playbackQualities', [
              'Auto',
              ...levels.map(this.levelToPlaybackQuality),
            ]);
            this.dispatch('playbackQuality', 'Auto');
          }
        }
        catch (e) {
          this.vmError.emit(e);
        }
      }
      listenToTextTracksForChanges() {
        var _a, _b, _c;
        this.textTracksDisposal.empty();
        if (isUndefined(this.mediaEl) || this.shouldRenderNativeTextTracks)
          return;
        // Init current track.
        const currentTrack = (_c = ((_b = (_a = this.dash) === null || _a === void 0 ? void 0 : _a.getCurrentTrackFor('text')) === null || _b === void 0 ? void 0 : _b.index) - 1) !== null && _c !== void 0 ? _c : -1;
        this.currentTextTrack = currentTrack;
        this.dispatch('currentTextTrack', currentTrack);
        this.textTracksDisposal.add(listen(this.mediaEl.textTracks, 'change', this.onTextTracksChange.bind(this)));
      }
      getTextTracks() {
        var _a, _b;
        return Array.from((_b = (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.textTracks) !== null && _b !== void 0 ? _b : []);
      }
      hideCurrentTextTrack() {
        const textTracks = this.getTextTracks();
        if (textTracks[this.currentTextTrack] && this.isTextTrackVisible) {
          textTracks[this.currentTextTrack].mode = 'hidden';
        }
      }
      onTextTracksChange() {
        this.hideCurrentTextTrack();
        this.dispatch('textTracks', this.getTextTracks());
        this.dispatch('isTextTrackVisible', this.isTextTrackVisible);
        this.dispatch('currentTextTrack', this.currentTextTrack);
      }
      /** @internal */
      getAdapter() {
        var _a, _b;
        return __awaiter$o(this, void 0, void 0, function* () {
          const adapter = (_b = (yield ((_a = this.videoProvider) === null || _a === void 0 ? void 0 : _a.getAdapter()))) !== null && _b !== void 0 ? _b : {};
          const canVideoProviderPlay = adapter.canPlay;
          return Object.assign(Object.assign({}, adapter), { getInternalPlayer: () => __awaiter$o(this, void 0, void 0, function* () { return this.dash; }), canPlay: (type) => __awaiter$o(this, void 0, void 0, function* () {
              var _c;
              return (isString(type) && dashRegex.test(type)) ||
                ((_c = canVideoProviderPlay === null || canVideoProviderPlay === void 0 ? void 0 : canVideoProviderPlay(type)) !== null && _c !== void 0 ? _c : false);
            }), canSetPlaybackQuality: () => __awaiter$o(this, void 0, void 0, function* () {
              var _d, _e;
              try {
                return ((_e = (_d = this.dash) === null || _d === void 0 ? void 0 : _d.getBitrateInfoListFor('video')) === null || _e === void 0 ? void 0 : _e.length) > 0;
              }
              catch (e) {
                this.vmError.emit(e);
                return false;
              }
            }), setPlaybackQuality: (quality) => __awaiter$o(this, void 0, void 0, function* () {
              if (!isUndefined(this.dash)) {
                const index = this.findLevelIndexFromQuality(quality);
                this.dash.updateSettings({
                  streaming: {
                    abr: {
                      autoSwitchBitrate: {
                        video: index === -1,
                      },
                    },
                  },
                });
                if (index >= 0)
                  this.dash.setQualityFor('video', index);
                // Update the provider cache.
                this.dispatch('playbackQuality', quality);
              }
            }), setCurrentTextTrack: (trackId) => __awaiter$o(this, void 0, void 0, function* () {
              var _f;
              if (this.shouldRenderNativeTextTracks) {
                adapter.setCurrentTextTrack(trackId);
              }
              else {
                this.currentTextTrack = trackId;
                (_f = this.dash) === null || _f === void 0 ? void 0 : _f.setTextTrack(trackId);
                this.onTextTracksChange();
              }
            }), setTextTrackVisibility: (isVisible) => __awaiter$o(this, void 0, void 0, function* () {
              var _g;
              if (this.shouldRenderNativeTextTracks) {
                adapter.setTextTrackVisibility(isVisible);
              }
              else {
                this.isTextTrackVisible = isVisible;
                (_g = this.dash) === null || _g === void 0 ? void 0 : _g.enableText(isVisible);
                this.onTextTracksChange();
              }
            }) });
        });
      }
      render() {
        return (h("vm-video", { willAttach: true, crossOrigin: this.crossOrigin, preload: this.preload, poster: this.poster, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, hasCustomTextManager: !this.shouldRenderNativeTextTracks, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, ref: (el) => {
            this.videoProvider = el;
          } }));
      }
      static get watchers() { return {
        "src": ["onSrcChange"],
        "hasAttached": ["onSrcChange"],
        "shouldRenderNativeTextTracks": ["onShouldRenderNativeTextTracks"],
        "isTextTrackVisible": ["onTextTrackChange"],
        "currentTextTrack": ["onTextTrackChange"]
      }; }
      static get style() { return dashCss; }
    };

    const dblClickFullscreenCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-dbl-click-fullscreen-z-index)}.dblClickFullscreen{display:none;width:100%;height:100%;pointer-events:none}.dblClickFullscreen.enabled{display:inline-block;pointer-events:auto}";

    var __awaiter$n = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const DblClickFullscreen = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetFullscreen = false;
        /**
         * By default this is disabled on mobile to not interfere with playback, set this to `true` to
         * enable it.
         */
        this.useOnMobile = false;
        /** @internal */
        this.isFullscreenActive = true;
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.isMobile = false;
        this.clicks = 0;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'playbackReady',
          'isFullscreenActive',
          'isVideoView',
          'isMobile',
        ]);
      }
      onPlaybackReadyChange() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.canSetFullscreen = yield player.canSetFullscreen();
        });
      }
      onTriggerClickToPlay() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const [clickToPlay] = getComponentFromRegistry(this, 'vm-click-to-play');
          yield (clickToPlay === null || clickToPlay === void 0 ? void 0 : clickToPlay.forceClick());
        });
      }
      onToggleFullscreen() {
        return __awaiter$n(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.isFullscreenActive
            ? player.exitFullscreen()
            : player.enterFullscreen();
        });
      }
      onClick() {
        this.clicks += 1;
        if (this.clicks === 1) {
          setTimeout(() => {
            if (this.clicks === 1) {
              this.onTriggerClickToPlay();
            }
            else {
              this.onToggleFullscreen();
            }
            this.clicks = 0;
          }, 300);
        }
      }
      render() {
        return (h("div", { class: {
            dblClickFullscreen: true,
            enabled: this.playbackReady &&
              this.canSetFullscreen &&
              this.isVideoView &&
              (!this.isMobile || this.useOnMobile),
          }, onClick: this.onClick.bind(this) }));
      }
      static get watchers() { return {
        "playbackReady": ["onPlaybackReadyChange"]
      }; }
      static get style() { return dblClickFullscreenCss; }
    };

    const defaultControlsCss = ":host{display:contents;pointer-events:none;z-index:var(--vm-controls-z-index)}";

    const DefaultControls = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * The length in milliseconds that the controls are active for before fading out. Audio players
         * are not effected by this prop.
         */
        this.activeDuration = 2750;
        /**
         * Whether the controls should wait for playback to start before being shown. Audio players
         * are not effected by this prop.
         */
        this.waitForPlaybackStart = false;
        /**
         * Whether the controls should show/hide when paused. Audio players are not effected by this prop.
         */
        this.hideWhenPaused = false;
        /**
         * Whether the controls should hide when the mouse leaves the player. Audio players are not
         * effected by this prop.
         */
        this.hideOnMouseLeave = false;
        /** @internal */
        this.isMobile = false;
        /** @internal */
        this.isLive = false;
        /** @internal */
        this.isAudioView = false;
        /** @internal */
        this.isVideoView = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'theme',
          'isMobile',
          'isAudioView',
          'isVideoView',
          'isLive',
        ]);
      }
      buildAudioControls() {
        return (h("vm-controls", { fullWidth: true }, h("vm-playback-control", { tooltipDirection: "right" }), h("vm-volume-control", null), !this.isLive && h("vm-current-time", null), this.isLive && h("vm-control-spacer", null), !this.isLive && h("vm-scrubber-control", null), this.isLive && h("vm-live-indicator", null), !this.isLive && h("vm-end-time", null), !this.isLive && h("vm-settings-control", { tooltipDirection: "left" }), h("div", { style: { marginLeft: '0', paddingRight: '2px' } })));
      }
      buildMobileVideoControls() {
        return (h(Fragment, null, h("vm-scrim", { gradient: "up" }), h("vm-controls", { pin: "topLeft", fullWidth: true, activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-control-spacer", null), h("vm-volume-control", null), !this.isLive && h("vm-caption-control", null), !this.isLive && h("vm-settings-control", null), this.isLive && h("vm-fullscreen-control", null)), h("vm-controls", { pin: "center", justify: "center", activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-playback-control", { style: { '--vm-control-scale': '1.3' } })), !this.isLive && (h("vm-controls", { pin: "bottomLeft", fullWidth: true, activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused }, h("vm-control-group", null, h("vm-current-time", null), h("vm-control-spacer", null), h("vm-end-time", null), h("vm-fullscreen-control", null)), h("vm-control-group", { space: "top" }, h("vm-scrubber-control", null))))));
      }
      buildDesktopVideoControls() {
        return (h(Fragment, null, this.theme !== 'light' && h("vm-scrim", { gradient: "up" }), h("vm-controls", { fullWidth: true, pin: "bottomRight", activeDuration: this.activeDuration, waitForPlaybackStart: this.waitForPlaybackStart, hideWhenPaused: this.hideWhenPaused, hideOnMouseLeave: this.hideOnMouseLeave }, !this.isLive && (h("vm-control-group", null, h("vm-scrubber-control", null))), h("vm-control-group", { space: this.isLive ? 'none' : 'top' }, h("vm-playback-control", { tooltipDirection: "right" }), h("vm-volume-control", null), !this.isLive && h("vm-time-progress", null), h("vm-control-spacer", null), !this.isLive && h("vm-caption-control", null), this.isLive && h("vm-live-indicator", null), h("vm-pip-control", null), !this.isLive && h("vm-settings-control", null), h("vm-fullscreen-control", { tooltipDirection: "left" })))));
      }
      render() {
        if (this.isAudioView)
          return this.buildAudioControls();
        if (this.isVideoView && this.isMobile)
          return this.buildMobileVideoControls();
        if (this.isVideoView)
          return this.buildDesktopVideoControls();
        return null;
      }
      static get style() { return defaultControlsCss; }
    };

    const defaultSettingsCss = ":host{z-index:var(--vm-menu-z-index)}";

    var __awaiter$m = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const DefaultSettings = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.textTracksDisposal = new Disposal();
        this.canSetPlaybackRate = false;
        this.canSetPlaybackQuality = false;
        this.canSetTextTrack = false;
        this.canSetAudioTrack = false;
        /**
         * Pins the settings to the defined position inside the video player. This has no effect when
         * the view is of type `audio`, it will always be `bottomRight`.
         */
        this.pin = 'bottomRight';
        /** @internal */
        this.i18n = {};
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.playbackRate = 1;
        /** @internal */
        this.playbackRates = [1];
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.playbackQualities = [];
        /** @internal */
        this.textTracks = [];
        /** @internal */
        this.currentTextTrack = -1;
        /** @internal */
        this.audioTracks = [];
        /** @internal */
        this.currentAudioTrack = -1;
        /** @internal */
        this.isTextTrackVisible = true;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'i18n',
          'playbackReady',
          'playbackRate',
          'playbackRates',
          'playbackQuality',
          'playbackQualities',
          'isVideoView',
          'textTracks',
          'currentTextTrack',
          'isTextTrackVisible',
          'audioTracks',
          'currentAudioTrack',
        ]);
      }
      onPlaybackReady() {
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.canSetPlaybackQuality = yield player.canSetPlaybackQuality();
          this.canSetPlaybackRate = yield player.canSetPlaybackRate();
        });
      }
      onAudioTracksChange() {
        var _a;
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetAudioTrack = (_a = (yield (player === null || player === void 0 ? void 0 : player.canSetAudioTrack()))) !== null && _a !== void 0 ? _a : false;
        });
      }
      onTextTracksChange() {
        var _a;
        return __awaiter$m(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetTextTrack = (_a = (yield (player === null || player === void 0 ? void 0 : player.canSetTextTrack()))) !== null && _a !== void 0 ? _a : false;
        });
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      componentDidLoad() {
        this.onTextTracksChange();
      }
      disconnectedCallback() {
        this.textTracksDisposal.empty();
      }
      onPlaybackRateSelect(event) {
        const radio = event.target;
        this.dispatch('playbackRate', parseFloat(radio.value));
      }
      buildPlaybackRateSubmenu() {
        if (this.playbackRates.length <= 1 || !this.canSetPlaybackRate) {
          return (h("vm-menu-item", { label: this.i18n.playbackRate, hint: this.i18n.normal }));
        }
        const formatRate = (rate) => rate === 1 ? this.i18n.normal : `${rate}`;
        return (h("vm-submenu", { label: this.i18n.playbackRate, hint: formatRate(this.playbackRate) }, h("vm-menu-radio-group", { value: `${this.playbackRate}`, onVmCheck: this.onPlaybackRateSelect.bind(this) }, this.playbackRates.map(rate => (h("vm-menu-radio", { label: formatRate(rate), value: `${rate}` }))))));
      }
      onPlaybackQualitySelect(event) {
        const radio = event.target;
        this.dispatch('playbackQuality', radio.value);
      }
      buildPlaybackQualitySubmenu() {
        var _a;
        if (this.playbackQualities.length <= 1 || !this.canSetPlaybackQuality) {
          return (h("vm-menu-item", { label: this.i18n.playbackQuality, hint: (_a = this.playbackQuality) !== null && _a !== void 0 ? _a : this.i18n.auto }));
        }
        // @TODO this doesn't account for audio qualities yet.
        const getBadge = (quality) => {
          const verticalPixels = parseInt(quality.slice(0, -1), 10);
          if (verticalPixels >= 2160)
            return 'UHD';
          if (verticalPixels >= 1080)
            return 'HD';
          return undefined;
        };
        return (h("vm-submenu", { label: this.i18n.playbackQuality, hint: this.playbackQuality }, h("vm-menu-radio-group", { value: this.playbackQuality, onVmCheck: this.onPlaybackQualitySelect.bind(this) }, this.playbackQualities.map(quality => (h("vm-menu-radio", { label: quality, value: quality, badge: getBadge(quality) }))))));
      }
      onTextTrackSelect(event) {
        const radio = event.target;
        const trackId = parseInt(radio.value, 10);
        const player = getPlayerFromRegistry(this);
        if (trackId === -1) {
          player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(false);
          return;
        }
        player === null || player === void 0 ? void 0 : player.setTextTrackVisibility(true);
        player === null || player === void 0 ? void 0 : player.setCurrentTextTrack(trackId);
      }
      buildTextTracksSubmenu() {
        var _a, _b, _c;
        if (this.textTracks.length <= 1 || !this.canSetTextTrack) {
          return (h("vm-menu-item", { label: this.i18n.subtitlesOrCc, hint: (_b = (_a = this.textTracks[this.currentTextTrack]) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : this.i18n.none }));
        }
        return (h("vm-submenu", { label: this.i18n.subtitlesOrCc, hint: this.isTextTrackVisible
            ? (_c = this.textTracks[this.currentTextTrack]) === null || _c === void 0 ? void 0 : _c.label
            : this.i18n.off }, h("vm-menu-radio-group", { value: `${!this.isTextTrackVisible ? -1 : this.currentTextTrack}`, onVmCheck: this.onTextTrackSelect.bind(this) }, [h("vm-menu-radio", { label: this.i18n.off, value: "-1" })].concat(this.textTracks.map((track, i) => (h("vm-menu-radio", { label: track.label, value: `${i}` })))))));
      }
      onAudioTrackSelect(event) {
        const radio = event.target;
        const trackId = parseInt(radio.value, 10);
        const player = getPlayerFromRegistry(this);
        player === null || player === void 0 ? void 0 : player.setCurrentAudioTrack(trackId);
      }
      buildAudioTracksMenu() {
        var _a, _b, _c;
        if (this.audioTracks.length <= 1 || !this.canSetAudioTrack) {
          return (h("vm-menu-item", { label: this.i18n.audio, hint: (_b = (_a = this.audioTracks[this.currentAudioTrack]) === null || _a === void 0 ? void 0 : _a.label) !== null && _b !== void 0 ? _b : this.i18n.default }));
        }
        return (h("vm-submenu", { label: this.i18n.audio, hint: (_c = this.audioTracks[this.currentAudioTrack]) === null || _c === void 0 ? void 0 : _c.label }, h("vm-menu-radio-group", { value: `${this.currentAudioTrack}`, onVmCheck: this.onAudioTrackSelect.bind(this) }, this.audioTracks.map((track, i) => (h("vm-menu-radio", { label: track.label, value: `${i}` }))))));
      }
      render() {
        return (h("vm-settings", { pin: this.pin }, this.buildAudioTracksMenu(), this.buildPlaybackRateSubmenu(), this.buildPlaybackQualitySubmenu(), this.isVideoView && this.buildTextTracksSubmenu(), h("slot", null)));
      }
      static get watchers() { return {
        "playbackReady": ["onPlaybackReady", "onAudioTracksChange", "onTextTracksChange"],
        "audioTracks": ["onAudioTracksChange"],
        "textTracks": ["onTextTracksChange"]
      }; }
      static get style() { return defaultSettingsCss; }
    };

    const defaultUiCss = ":host{display:contents;pointer-events:none}";

    const DefaultUI = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * Whether clicking the player should not toggle playback.
         */
        this.noClickToPlay = false;
        /**
         * Whether double clicking the player should not toggle fullscreen mode.
         */
        this.noDblClickFullscreen = false;
        /**
         * Whether the custom captions UI should not be loaded.
         */
        this.noCaptions = false;
        /**
         * Whether the custom poster UI should not be loaded.
         */
        this.noPoster = false;
        /**
         * Whether the custom spinner UI should not be loaded.
         */
        this.noSpinner = false;
        /**
         * Whether the custom default controls should not be loaded.
         */
        this.noControls = false;
        /**
         * Whether the custom default settings menu should not be loaded.
         */
        this.noSettings = false;
        /**
         * Whether the default loading screen should not be loaded.
         */
        this.noLoadingScreen = false;
        withComponentRegistry(this);
      }
      render() {
        return (h("vm-ui", null, !this.noClickToPlay && h("vm-click-to-play", null), !this.noDblClickFullscreen && h("vm-dbl-click-fullscreen", null), !this.noCaptions && h("vm-captions", null), !this.noPoster && h("vm-poster", null), !this.noSpinner && h("vm-spinner", null), !this.noLoadingScreen && h("vm-loading-screen", null), !this.noControls && h("vm-default-controls", null), !this.noSettings && h("vm-default-settings", null), h("slot", null)));
      }
      static get style() { return defaultUiCss; }
    };

    class LazyLoader {
      constructor(el, attributes, onLoad) {
        var _a;
        this.el = el;
        this.attributes = attributes;
        this.onLoad = onLoad;
        this.hasLoaded = false;
        if (isNil(this.el))
          return;
        this.intersectionObs = this.canObserveIntersection()
          ? new IntersectionObserver(this.onIntersection.bind(this))
          : undefined;
        this.mutationObs = this.canObserveMutations()
          ? new MutationObserver(this.onMutation.bind(this))
          : undefined;
        (_a = this.mutationObs) === null || _a === void 0 ? void 0 : _a.observe(this.el, {
          childList: true,
          subtree: true,
          attributeFilter: this.attributes,
        });
        this.lazyLoad();
      }
      didLoad() {
        return this.hasLoaded;
      }
      destroy() {
        var _a, _b;
        (_a = this.intersectionObs) === null || _a === void 0 ? void 0 : _a.disconnect();
        (_b = this.mutationObs) === null || _b === void 0 ? void 0 : _b.disconnect();
      }
      canObserveIntersection() {
        return IS_CLIENT && window.IntersectionObserver;
      }
      canObserveMutations() {
        return IS_CLIENT && window.MutationObserver;
      }
      lazyLoad() {
        var _a;
        if (this.canObserveIntersection()) {
          (_a = this.intersectionObs) === null || _a === void 0 ? void 0 : _a.observe(this.el);
        }
        else {
          this.load();
        }
      }
      onIntersection(entries) {
        entries.forEach(entry => {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            this.load();
            this.intersectionObs.unobserve(entry.target);
          }
        });
      }
      onMutation() {
        if (this.hasLoaded)
          this.load();
      }
      getLazyElements() {
        const root = !isNil(this.el.shadowRoot) ? this.el.shadowRoot : this.el;
        return root.querySelectorAll('.lazy');
      }
      load() {
        window.requestAnimationFrame(() => {
          this.getLazyElements().forEach(this.loadEl.bind(this));
        });
      }
      loadEl(el) {
        var _a, _b;
        (_a = this.intersectionObs) === null || _a === void 0 ? void 0 : _a.unobserve(el);
        this.hasLoaded = true;
        (_b = this.onLoad) === null || _b === void 0 ? void 0 : _b.call(this, el);
      }
    }

    const embedCss = ":host{z-index:var(--vm-media-z-index)}iframe{position:absolute;top:0;left:0;border:0;width:100%;height:100%;user-select:none}";

    var __awaiter$l = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let idCount$4 = 0;
    const connected = new Set();
    const Embed = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmEmbedSrcChange = createEvent(this, "vmEmbedSrcChange", 3);
        this.vmEmbedMessage = createEvent(this, "vmEmbedMessage", 3);
        this.vmEmbedLoaded = createEvent(this, "vmEmbedLoaded", 3);
        this.srcWithParams = '';
        this.hasEnteredViewport = false;
        /**
         * A URL that will load the external player and media (Eg: https://www.youtube.com/embed/DyTCOwB0DVw).
         */
        this.embedSrc = '';
        /**
         * The title of the current media so it can be set on the inner `iframe` for screen readers.
         */
        this.mediaTitle = '';
        /**
         * The parameters to pass to the embedded player which are appended to the `embedSrc` prop. These
         * can be passed in as a query string or object.
         */
        this.params = '';
        /**
         * A collection of URLs to that the browser should immediately start establishing a connection
         * with.
         */
        this.preconnections = [];
        withComponentRegistry(this);
      }
      onEmbedSrcChange() {
        this.srcWithParams =
          isString(this.embedSrc) && this.embedSrc.length > 0
            ? appendParamsToURL(this.embedSrc, this.params)
            : undefined;
      }
      srcWithParamsChange() {
        if (isUndefined(this.srcWithParams)) {
          this.vmEmbedSrcChange.emit(this.srcWithParams);
          return;
        }
        if (!this.hasEnteredViewport && !connected.has(this.embedSrc)) {
          if (preconnect(this.srcWithParams))
            connected.add(this.embedSrc);
        }
        this.vmEmbedSrcChange.emit(this.srcWithParams);
      }
      preconnectionsChange() {
        if (this.hasEnteredViewport) {
          return;
        }
        this.preconnections
          .filter(connection => !connected.has(connection))
          .forEach(connection => {
          if (preconnect(connection))
            connected.add(connection);
        });
      }
      connectedCallback() {
        this.lazyLoader = new LazyLoader(this.host, ['data-src'], el => {
          const src = el.getAttribute('data-src');
          el.removeAttribute('src');
          if (!isNull(src))
            el.setAttribute('src', src);
        });
        this.onEmbedSrcChange();
        this.genIframeId();
      }
      disconnectedCallback() {
        this.lazyLoader.destroy();
      }
      onWindowMessage(e) {
        var _a, _b, _c;
        const originMatches = e.source === ((_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) &&
          (!isString(this.origin) || this.origin === e.origin);
        if (!originMatches)
          return;
        const message = (_c = (_b = this.decoder) === null || _b === void 0 ? void 0 : _b.call(this, e.data)) !== null && _c !== void 0 ? _c : e.data;
        if (message)
          this.vmEmbedMessage.emit(message);
      }
      /**
       * Posts a message to the embedded media player.
       */
      postMessage(message, target) {
        var _a, _b;
        return __awaiter$l(this, void 0, void 0, function* () {
          (_b = (_a = this.iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage(JSON.stringify(message), target !== null && target !== void 0 ? target : '*');
        });
      }
      onLoad() {
        this.vmEmbedLoaded.emit();
      }
      genIframeId() {
        idCount$4 += 1;
        this.id = `vm-iframe-${idCount$4}`;
      }
      render() {
        return (h("iframe", { id: this.id, class: "lazy", title: this.mediaTitle, "data-src": this.srcWithParams, allowFullScreen: true, allow: "autoplay; encrypted-media; picture-in-picture;", onLoad: this.onLoad.bind(this), ref: (el) => {
            this.iframe = el;
          } }));
      }
      get host() { return this; }
      static get watchers() { return {
        "embedSrc": ["onEmbedSrcChange"],
        "params": ["onEmbedSrcChange"],
        "srcWithParams": ["srcWithParamsChange"],
        "preconnections": ["preconnectionsChange"]
      }; }
      static get style() { return embedCss; }
    };

    const endTimeCss = ":host{display:flex;align-items:center;justify-content:center}";

    const EndTime = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.duration = -1;
        /** @internal */
        this.i18n = {};
        /**
         * Whether the time should always show the hours unit, even if the time is less than
         * 1 hour (eg: `20:35` -> `00:20:35`).
         */
        this.alwaysShowHours = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['duration', 'i18n']);
      }
      render() {
        return (h("vm-time", { label: this.i18n.duration, seconds: Math.max(0, this.duration), alwaysShowHours: this.alwaysShowHours }));
      }
      static get style() { return endTimeCss; }
    };

    var key$1 = {
        fullscreenEnabled: 0,
        fullscreenElement: 1,
        requestFullscreen: 2,
        exitFullscreen: 3,
        fullscreenchange: 4,
        fullscreenerror: 5,
        fullscreen: 6
    };
    var webkit = [
        'webkitFullscreenEnabled',
        'webkitFullscreenElement',
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
        '-webkit-full-screen',
    ];
    var moz = [
        'mozFullScreenEnabled',
        'mozFullScreenElement',
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozfullscreenchange',
        'mozfullscreenerror',
        '-moz-full-screen',
    ];
    var ms = [
        'msFullscreenEnabled',
        'msFullscreenElement',
        'msRequestFullscreen',
        'msExitFullscreen',
        'MSFullscreenChange',
        'MSFullscreenError',
        '-ms-fullscreen',
    ];
    // so it doesn't throw if no window or document
    var document$1 = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
    var vendor = (('fullscreenEnabled' in document$1 && Object.keys(key$1)) ||
        (webkit[0] in document$1 && webkit) ||
        (moz[0] in document$1 && moz) ||
        (ms[0] in document$1 && ms) ||
        []);
    var fscreen = {
        requestFullscreen: function (element) { return element[vendor[key$1.requestFullscreen]](); },
        requestFullscreenFunction: function (element) { return element[vendor[key$1.requestFullscreen]]; },
        get exitFullscreen() { return document$1[vendor[key$1.exitFullscreen]].bind(document$1); },
        get fullscreenPseudoClass() { return ":" + vendor[key$1.fullscreen]; },
        addEventListener: function (type, handler, options) { return document$1.addEventListener(vendor[key$1[type]], handler, options); },
        removeEventListener: function (type, handler, options) { return document$1.removeEventListener(vendor[key$1[type]], handler, options); },
        get fullscreenEnabled() { return Boolean(document$1[vendor[key$1.fullscreenEnabled]]); },
        set fullscreenEnabled(val) { },
        get fullscreenElement() { return document$1[vendor[key$1.fullscreenElement]]; },
        set fullscreenElement(val) { },
        get onfullscreenchange() { return document$1[("on" + vendor[key$1.fullscreenchange]).toLowerCase()]; },
        set onfullscreenchange(handler) { return document$1[("on" + vendor[key$1.fullscreenchange]).toLowerCase()] = handler; },
        get onfullscreenerror() { return document$1[("on" + vendor[key$1.fullscreenerror]).toLowerCase()]; },
        set onfullscreenerror(handler) { return document$1[("on" + vendor[key$1.fullscreenerror]).toLowerCase()] = handler; },
    };

    function mitt(n){return {all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e]);},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]));},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e);}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e);});}}}

    var __awaiter$k = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * Unfortunately fullscreen isn't straight forward due to cross-browser inconsistencies. This
     * class abstract the logic for handling fullscreen across browsers.
     */
    class FullscreenController {
      constructor(host) {
        this.host = host;
        this.disposal = new Disposal();
        this.emitter = mitt();
      }
      /**
       * Whether fullscreen mode can be requested, generally is an API available to do so.
       */
      get isSupported() {
        return this.isSupportedNatively;
      }
      /**
       * Whether the native Fullscreen API is enabled/available.
       */
      get isSupportedNatively() {
        return fscreen.fullscreenEnabled;
      }
      /**
       * Whether the host element is in fullscreen mode.
       */
      get isFullscreen() {
        return this.isNativeFullscreen;
      }
      /**
       * Whether the host element is in fullscreen mode via the native Fullscreen API.
       */
      get isNativeFullscreen() {
        if (fscreen.fullscreenElement === this.host)
          return true;
        try {
          // Throws in iOS Safari...
          return this.host.matches(
          // Property `fullscreenPseudoClass` is missing from `@types/fscreen`.
          fscreen
            .fullscreenPseudoClass);
        }
        catch (error) {
          return false;
        }
      }
      on(type, handler) {
        // @ts-expect-error - not typed yet.
        this.emitter.on(type, handler);
      }
      off(type, handler) {
        // @ts-expect-error - not typed yet.
        this.emitter.off(type, handler);
      }
      /**
       * Dispose of any event listeners and exit fullscreen (if active).
       */
      destroy() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (this.isFullscreen)
            yield this.exitFullscreen();
          this.disposal.empty();
          this.emitter.all.clear();
        });
      }
      addFullscreenChangeEventListener(handler) {
        if (!this.isSupported)
          return noop;
        return listen(fscreen, 'fullscreenchange', handler);
      }
      addFullscreenErrorEventListener(handler) {
        if (!this.isSupported)
          return noop;
        return listen(fscreen, 'fullscreenerror', handler);
      }
      requestFullscreen() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (this.isFullscreen)
            return;
          this.throwIfNoFullscreenSupport();
          // TODO: Check if PiP is active, if so make sure to exit - need PipController.
          this.disposal.add(this.addFullscreenChangeEventListener(this.handleFullscreenChange.bind(this)));
          this.disposal.add(this.addFullscreenErrorEventListener(this.handleFullscreenError.bind(this)));
          return this.makeEnterFullscreenRequest();
        });
      }
      makeEnterFullscreenRequest() {
        return __awaiter$k(this, void 0, void 0, function* () {
          return fscreen.requestFullscreen(this.host);
        });
      }
      handleFullscreenChange() {
        if (!this.isFullscreen)
          this.disposal.empty();
        this.emitter.emit('change', this.isFullscreen);
      }
      handleFullscreenError(event) {
        this.emitter.emit('error', event);
      }
      exitFullscreen() {
        return __awaiter$k(this, void 0, void 0, function* () {
          if (!this.isFullscreen)
            return;
          this.throwIfNoFullscreenSupport();
          return this.makeExitFullscreenRequest();
        });
      }
      makeExitFullscreenRequest() {
        return __awaiter$k(this, void 0, void 0, function* () {
          return fscreen.exitFullscreen();
        });
      }
      throwIfNoFullscreenSupport() {
        if (this.isSupported)
          return;
        throw Error('Fullscreen API is not enabled or supported in this environment.');
      }
    }

    var __awaiter$j = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * Extends the base `FullscreenController` with additional logic for handling fullscreen
     * on iOS Safari where the native Fullscreen API is not available (in this case it fallsback to
     * using the `VideoPresentationController`).
     */
    class VideoFullscreenController extends FullscreenController {
      constructor(host, presentationController) {
        super(host);
        this.host = host;
        this.presentationController = presentationController;
      }
      get isFullscreen() {
        return this.presentationController.isFullscreenMode;
      }
      /**
       * Whether a fallback fullscreen API is available on Safari using presentation modes. This
       * is only used on iOS where the native fullscreen API is not available.
       *
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
       */
      get isSupported() {
        return this.presentationController.isSupported;
      }
      makeEnterFullscreenRequest() {
        return __awaiter$j(this, void 0, void 0, function* () {
          return this.presentationController.setPresentationMode('fullscreen');
        });
      }
      makeExitFullscreenRequest() {
        return __awaiter$j(this, void 0, void 0, function* () {
          return this.presentationController.setPresentationMode('inline');
        });
      }
      addFullscreenChangeEventListener() {
        if (!this.isSupported)
          return noop;
        this.presentationController.on('change', this.handlePresentationModeChange.bind(this));
        return () => {
          this.presentationController.off('change', this.handlePresentationModeChange.bind(this));
        };
      }
      handlePresentationModeChange() {
        this.handleFullscreenChange();
      }
      addFullscreenErrorEventListener() {
        return noop;
      }
    }

    var __awaiter$i = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * Contains the logic for handling presentation modes on Safari. This class is used by
     * the `VideoFullscreenController` as a fallback when the native Fullscreen API is not
     * available (ie: iOS Safari).
     */
    class VideoPresentationController {
      constructor(host) {
        this.host = host;
        this.disposal = new Disposal();
        this.emitter = mitt();
        const disconnectedCallback = host.disconnectedCallback;
        host.disconnectedCallback = () => __awaiter$i(this, void 0, void 0, function* () {
          yield this.destroy();
          disconnectedCallback === null || disconnectedCallback === void 0 ? void 0 : disconnectedCallback.call(host);
        });
      }
      get videoElement() {
        var _a;
        if (((_a = this.host.mediaEl) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'video') {
          return this.host.mediaEl;
        }
        return undefined;
      }
      /**
       * The current presentation mode, possible values include `inline`, `picture-in-picture` and
       * `fullscreen`. Only available in Safari.
       *
       * @default undefined
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1631913-webkitpresentationmode
       */
      get presentationMode() {
        var _a;
        return (_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.webkitPresentationMode;
      }
      /**
       * Whether the current `presentationMode` is `inline`.
       */
      get isInlineMode() {
        return this.presentationMode === 'inline';
      }
      /**
       * Whether the current `presentationMode` is `picture-in-picture`.
       */
      get isPictureInPictureMode() {
        return this.presentationMode === 'inline';
      }
      /**
       * Whether the current `presentationMode` is `fullscreen`.
       */
      get isFullscreenMode() {
        return this.presentationMode === 'fullscreen';
      }
      /**
       * Whether the presentation mode API is available.
       *
       * @link https://developer.apple.com/documentation/webkitjs/htmlvideoelement/1628805-webkitsupportsfullscreen
       */
      get isSupported() {
        var _a, _b, _c;
        return (IS_IOS &&
          isFunction((_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.webkitSetPresentationMode) &&
          ((_c = (_b = this.videoElement) === null || _b === void 0 ? void 0 : _b.webkitSupportsFullscreen) !== null && _c !== void 0 ? _c : false));
      }
      setPresentationMode(mode) {
        var _a, _b;
        (_b = (_a = this.videoElement) === null || _a === void 0 ? void 0 : _a.webkitSetPresentationMode) === null || _b === void 0 ? void 0 : _b.call(_a, mode);
      }
      on(type, handler) {
        // @ts-expect-error - not typed yet.
        this.emitter.on(type, handler);
      }
      off(type, handler) {
        // @ts-expect-error - not typed yet.
        this.emitter.off(type, handler);
      }
      destroy() {
        this.setPresentationMode('inline');
        this.disposal.empty();
      }
      addPresentationModeChangeEventListener() {
        if (!this.isSupported || isNil(this.videoElement))
          return noop;
        return listen(this.videoElement, 'webkitpresentationmodechanged', this.handlePresentationModeChange.bind(this));
      }
      handlePresentationModeChange() {
        this.emitter.emit('change', this.presentationMode);
      }
    }

    const fileCss = "audio.sc-vm-file,video.sc-vm-file{border-radius:inherit;vertical-align:middle;width:100%;outline:0}video.sc-vm-file{position:absolute;top:0;left:0;border:0;height:100%;user-select:none}";

    var __awaiter$h = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const File = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.vmMediaElChange = createEvent(this, "vmMediaElChange", 7);
        this.vmSrcSetChange = createEvent(this, "vmSrcSetChange", 7);
        this.textTracksDisposal = new Disposal();
        this.wasPausedBeforeSeeking = true;
        this.currentSrcSet = [];
        this.mediaQueryDisposal = new Disposal();
        /** @internal Whether an external SDK will attach itself to the media player and control it. */
        this.willAttach = false;
        /** @inheritdoc */
        this.preload = 'metadata';
        /**
         * The playback rates that are available for this media.
         */
        this.playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];
        /** @internal */
        this.language = 'en';
        /** @internal */
        this.autoplay = false;
        /** @internal */
        this.controls = false;
        /** @internal */
        this.loop = false;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.playsinline = false;
        /** @internal */
        this.noConnect = false;
        /** @internal */
        this.paused = true;
        /** @internal */
        this.currentTime = 0;
        /** @internal */
        this.volume = 0;
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.playbackStarted = false;
        this.presentationController = new VideoPresentationController(this);
        this.fullscreenController = new VideoFullscreenController(this, this.presentationController);
        /** @internal */
        this.currentTextTrack = -1;
        /** @internal */
        this.hasCustomTextManager = false;
        /** @internal */
        this.isTextTrackVisible = true;
        /** @internal */
        this.shouldRenderNativeTextTracks = true;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this, [
          'playbackReady',
          'playbackStarted',
          'currentTime',
          'volume',
          'paused',
          'currentTextTrack',
          'isTextTrackVisible',
          'shouldRenderNativeTextTracks',
        ]);
        watchComponentRegistry(this, 'vm-poster', regs => {
          [this.vmPoster] = regs;
        });
      }
      onMediaTitleChange() {
        this.dispatch('mediaTitle', this.mediaTitle);
      }
      onPosterChange() {
        var _a;
        if (!this.playbackStarted)
          (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.load();
      }
      onViewTypeChange() {
        this.dispatch('viewType', this.viewType);
      }
      connectedCallback() {
        this.initLazyLoader();
        this.dispatch = createProviderDispatcher(this);
        this.onViewTypeChange();
        this.onPosterChange();
        this.onMediaTitleChange();
        this.addPresentationControllerListeners();
      }
      componentDidRender() {
        if (this.prevMediaEl !== this.mediaEl) {
          this.prevMediaEl = this.mediaEl;
          this.vmMediaElChange.emit(this.mediaEl);
          this.presentationController.addPresentationModeChangeEventListener();
        }
      }
      componentDidLoad() {
        this.onViewTypeChange();
      }
      disconnectedCallback() {
        var _a;
        this.mediaQueryDisposal.empty();
        this.textTracksDisposal.empty();
        this.cancelTimeUpdates();
        (_a = this.lazyLoader) === null || _a === void 0 ? void 0 : _a.destroy();
        this.wasPausedBeforeSeeking = true;
      }
      initLazyLoader() {
        this.lazyLoader = new LazyLoader(this.host, ['data-src', 'data-poster'], () => {
          if (isNil(this.mediaEl))
            return;
          const poster = this.mediaEl.getAttribute('data-poster');
          if (!isNull(poster))
            this.mediaEl.setAttribute('poster', poster);
          this.refresh();
          this.didSrcSetChange();
        });
      }
      refresh() {
        if (isNil(this.mediaEl))
          return;
        const { children } = this.mediaEl;
        for (let i = 0; i <= children.length - 1; i += 1) {
          const child = children[i];
          const src = child.getAttribute('data-src') ||
            child.getAttribute('src') ||
            child.getAttribute('data-vs');
          child.removeAttribute('src');
          if (isNull(src))
            continue;
          child.setAttribute('data-vs', src);
          child.setAttribute('src', src);
        }
      }
      didSrcSetChange() {
        if (isNil(this.mediaEl))
          return;
        const sources = Array.from(this.mediaEl.querySelectorAll('source'));
        const srcSet = sources.map(source => {
          var _a;
          return ({
            src: source.getAttribute('data-vs'),
            media: (_a = source.getAttribute('data-media')) !== null && _a !== void 0 ? _a : undefined,
            ref: source,
          });
        });
        const didChange = this.currentSrcSet.length !== srcSet.length ||
          srcSet.some((resource, i) => this.currentSrcSet[i].src !== resource.src);
        if (didChange) {
          this.currentSrcSet = srcSet;
          this.onSrcSetChange();
        }
      }
      onSrcSetChange() {
        var _a;
        this.textTracksDisposal.empty();
        this.mediaQueryDisposal.empty();
        this.vmLoadStart.emit();
        this.vmSrcSetChange.emit(this.currentSrcSet);
        if (!this.willAttach)
          (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.load();
      }
      hasCustomPoster() {
        return !IS_IOS && !isUndefined(this.vmPoster);
      }
      cancelTimeUpdates() {
        if (isNumber(this.timeRAF))
          window.cancelAnimationFrame(this.timeRAF);
        this.timeRAF = undefined;
      }
      requestTimeUpdates() {
        var _a, _b;
        this.dispatch('currentTime', (_b = (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.currentTime) !== null && _b !== void 0 ? _b : 0);
        this.timeRAF = window.requestAnimationFrame(() => {
          this.requestTimeUpdates();
        });
      }
      getMediaType() {
        const { currentSrc } = this.mediaEl;
        if (audioRegex.test(currentSrc))
          return MediaType.Audio;
        if (videoRegex.test(currentSrc) || hlsRegex.test(currentSrc))
          return MediaType.Video;
        return undefined;
      }
      onLoadedMetadata() {
        this.mediaEl.volume = this.volume / 100;
        this.listenToTextTracksForChanges();
        this.onTextTracksChange();
        this.onProgress();
        this.dispatch('currentPoster', this.poster);
        this.dispatch('duration', this.mediaEl.duration);
        this.dispatch('playbackRates', this.playbackRates);
        if (!this.willAttach) {
          this.dispatch('currentSrc', this.mediaEl.currentSrc);
          this.dispatch('mediaType', this.getMediaType());
          this.dispatch('playbackReady', true);
        }
      }
      onProgress() {
        const { buffered, duration } = this.mediaEl;
        const end = buffered.length === 0 ? 0 : buffered.end(buffered.length - 1);
        this.dispatch('buffered', end > duration ? duration : end);
      }
      onPlay() {
        this.requestTimeUpdates();
        this.dispatch('paused', false);
        if (!this.playbackStarted)
          this.dispatch('playbackStarted', true);
      }
      onPause() {
        this.cancelTimeUpdates();
        this.dispatch('paused', true);
        this.dispatch('buffering', false);
      }
      onPlaying() {
        this.dispatch('playing', true);
        this.dispatch('buffering', false);
      }
      onSeeking() {
        if (!this.wasPausedBeforeSeeking)
          this.wasPausedBeforeSeeking = this.mediaEl.paused;
        this.dispatch('currentTime', this.mediaEl.currentTime);
        this.dispatch('seeking', true);
      }
      onSeeked() {
        // Avoid calling `attemptToPlay` if seeking to 0 on 0.
        if (this.currentTime === 0 && !this.playbackStarted)
          return;
        this.dispatch('seeking', false);
        if (!this.playbackStarted || !this.wasPausedBeforeSeeking)
          this.attemptToPlay();
        this.wasPausedBeforeSeeking = true;
      }
      onRateChange() {
        this.dispatch('playbackRate', this.mediaEl.playbackRate);
      }
      onVolumeChange() {
        this.dispatch('muted', this.mediaEl.muted);
        this.dispatch('volume', this.mediaEl.volume * 100);
      }
      onDurationChange() {
        this.dispatch('duration', this.mediaEl.duration);
      }
      onWaiting() {
        this.dispatch('buffering', true);
      }
      onSuspend() {
        this.dispatch('buffering', false);
      }
      onEnded() {
        if (!this.loop)
          this.dispatch('playbackEnded', true);
      }
      onError() {
        this.vmError.emit(this.mediaEl.error);
      }
      attemptToPlay() {
        var _a;
        try {
          (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.play();
        }
        catch (e) {
          this.vmError.emit(e);
        }
      }
      togglePiPInChrome(toggle) {
        var _a;
        return toggle
          ? (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.requestPictureInPicture()
          : document.exitPictureInPicture();
      }
      togglePiPInSafari(toggle) {
        var _a, _b;
        const mode = toggle
          ? "picture-in-picture" /* PiP */
          : "inline" /* Inline */;
        if (!((_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.webkitSupportsPresentationMode(mode))) {
          throw new Error('PiP API is not available.');
        }
        return (_b = this.mediaEl) === null || _b === void 0 ? void 0 : _b.webkitSetPresentationMode(mode);
      }
      togglePiP(toggle) {
        return __awaiter$h(this, void 0, void 0, function* () {
          if (canUsePiPInChrome())
            return this.togglePiPInChrome(toggle);
          if (canUsePiPInSafari())
            return this.togglePiPInSafari(toggle);
          throw new Error('PiP API is not available.');
        });
      }
      onEnterPiP() {
        this.dispatch('isPiPActive', true);
      }
      onLeavePiP() {
        this.dispatch('isPiPActive', false);
      }
      addPresentationControllerListeners() {
        this.presentationController.on('change', mode => {
          this.dispatch('isPiPActive', mode === "picture-in-picture" /* PiP */);
          this.dispatch('isFullscreenActive', mode === "fullscreen" /* Fullscreen */);
        });
      }
      /** @internal */
      getAdapter() {
        return __awaiter$h(this, void 0, void 0, function* () {
          return {
            getInternalPlayer: () => __awaiter$h(this, void 0, void 0, function* () { return this.mediaEl; }),
            play: () => __awaiter$h(this, void 0, void 0, function* () { var _a; return (_a = this.mediaEl) === null || _a === void 0 ? void 0 : _a.play(); }),
            pause: () => __awaiter$h(this, void 0, void 0, function* () { var _b; return (_b = this.mediaEl) === null || _b === void 0 ? void 0 : _b.pause(); }),
            canPlay: (type) => __awaiter$h(this, void 0, void 0, function* () { return isString(type) && (audioRegex.test(type) || videoRegex.test(type)); }),
            setCurrentTime: (time) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.currentTime = time;
            }),
            setMuted: (muted) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.muted = muted;
            }),
            setVolume: (volume) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.volume = volume / 100;
            }),
            canSetPlaybackRate: () => __awaiter$h(this, void 0, void 0, function* () { return true; }),
            setPlaybackRate: (rate) => __awaiter$h(this, void 0, void 0, function* () {
              if (this.mediaEl)
                this.mediaEl.playbackRate = rate;
            }),
            canSetPiP: () => __awaiter$h(this, void 0, void 0, function* () { return canUsePiP(); }),
            enterPiP: () => this.togglePiP(true),
            exitPiP: () => this.togglePiP(false),
            canSetFullscreen: () => __awaiter$h(this, void 0, void 0, function* () { return this.fullscreenController.isSupported; }),
            enterFullscreen: () => this.fullscreenController.requestFullscreen(),
            exitFullscreen: () => this.fullscreenController.exitFullscreen(),
            setCurrentTextTrack: (trackId) => __awaiter$h(this, void 0, void 0, function* () {
              if (trackId !== this.currentTextTrack)
                this.toggleTextTrackModes(trackId);
            }),
            setTextTrackVisibility: (isVisible) => __awaiter$h(this, void 0, void 0, function* () {
              this.isTextTrackVisible = isVisible;
              this.toggleTextTrackModes(this.currentTextTrack);
            }),
          };
        });
      }
      onHasCustomTextManagerChange() {
        if (this.hasCustomTextManager) {
          this.textTracksDisposal.empty();
        }
        else if (this.playbackReady) {
          this.listenToTextTracksForChanges();
        }
      }
      onShouldRenderNativeTextTracksChange() {
        if (this.hasCustomTextManager)
          return;
        this.toggleTextTrackModes(this.currentTextTrack);
      }
      onProviderConnect(event) {
        if (this.noConnect)
          event.stopImmediatePropagation();
      }
      onProviderDisconnect(event) {
        if (this.noConnect)
          event.stopImmediatePropagation();
      }
      getFilteredTextTracks() {
        const tracks = [];
        const textTrackList = Array.from(this.mediaEl.textTracks);
        for (let i = 0; i < textTrackList.length; i += 1) {
          const track = textTrackList[i];
          // Edge adds a track without a label; we don't want to use it.
          if ((track.kind === 'subtitles' || track.kind === 'captions') &&
            track.label) {
            tracks.push(textTrackList[i]);
          }
        }
        return tracks;
      }
      listenToTextTracksForChanges() {
        if (this.hasCustomTextManager)
          return;
        this.textTracksDisposal.empty();
        if (isUndefined(this.mediaEl))
          return;
        this.textTracksDisposal.add(listen(this.mediaEl.textTracks, 'change', this.onTextTracksChange.bind(this)));
      }
      onTextTracksChange() {
        var _a;
        const tracks = this.getFilteredTextTracks();
        let trackId = -1;
        for (let id = 0; id < tracks.length; id += 1) {
          if (tracks[id].mode === 'hidden') {
            // Do not break in case there is a following track with showing.
            trackId = id;
          }
          else if (tracks[id].mode === 'showing') {
            trackId = id;
            break;
          }
        }
        if (!this.shouldRenderNativeTextTracks &&
          ((_a = tracks[trackId]) === null || _a === void 0 ? void 0 : _a.mode) === 'showing') {
          tracks[trackId].mode = 'hidden';
          return;
        }
        if (this.shouldRenderNativeTextTracks) {
          this.isTextTrackVisible =
            trackId !== -1 && tracks[trackId].mode === 'showing';
          this.dispatch('isTextTrackVisible', this.isTextTrackVisible);
        }
        this.dispatch('textTracks', tracks);
        this.dispatch('currentTextTrack', this.shouldRenderNativeTextTracks && !this.isTextTrackVisible
          ? -1
          : trackId);
      }
      toggleTextTrackModes(newTrackId) {
        if (isNil(this.mediaEl))
          return;
        const { textTracks } = this.mediaEl;
        if (newTrackId === -1) {
          Array.from(textTracks).forEach(track => {
            track.mode = 'disabled';
          });
        }
        else {
          const oldTrack = textTracks[this.currentTextTrack];
          if (oldTrack)
            oldTrack.mode = 'disabled';
        }
        const nextTrack = textTracks[newTrackId];
        if (nextTrack) {
          nextTrack.mode =
            this.isTextTrackVisible && this.shouldRenderNativeTextTracks
              ? 'showing'
              : 'hidden';
        }
        this.dispatch('currentTextTrack', this.shouldRenderNativeTextTracks && !this.isTextTrackVisible
          ? -1
          : newTrackId);
        this.dispatch('isTextTrackVisible', this.isTextTrackVisible);
      }
      render() {
        const mediaProps = {
          autoplay: this.autoplay,
          muted: this.muted,
          playsinline: this.playsinline,
          playsInline: this.playsinline,
          'x5-playsinline': this.playsinline,
          'webkit-playsinline': this.playsinline,
          controls: this.controls,
          crossorigin: this.crossOrigin === '' ? 'anonymous' : this.crossOrigin,
          controlslist: this.controlsList,
          'data-poster': !this.hasCustomPoster() ? this.poster : undefined,
          loop: this.loop,
          preload: this.preload,
          disablePictureInPicture: this.disablePiP,
          autoPictureInPicture: this.autoPiP,
          disableRemotePlayback: this.disableRemotePlayback,
          'x-webkit-airplay': this.disableRemotePlayback ? 'deny' : 'allow',
          ref: (el) => {
            this.mediaEl = el;
          },
          onLoadedMetadata: this.onLoadedMetadata.bind(this),
          onProgress: this.onProgress.bind(this),
          onPlay: this.onPlay.bind(this),
          onPause: this.onPause.bind(this),
          onPlaying: this.onPlaying.bind(this),
          onSeeking: this.onSeeking.bind(this),
          onSeeked: this.onSeeked.bind(this),
          onRateChange: this.onRateChange.bind(this),
          onVolumeChange: this.onVolumeChange.bind(this),
          onDurationChange: this.onDurationChange.bind(this),
          onWaiting: this.onWaiting.bind(this),
          onSuspend: this.onSuspend.bind(this),
          onEnded: this.onEnded.bind(this),
          onError: this.onError.bind(this),
        };
        const audio = (h("audio", Object.assign({ class: "lazy" }, mediaProps), h("slot", null), "Your browser does not support the", h("code", null, "audio"), "element."));
        const video = (h("video", Object.assign({ class: "lazy" }, mediaProps, {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onenterpictureinpicture: this.onEnterPiP.bind(this), onleavepictureinpicture: this.onLeavePiP.bind(this)
        }), h("slot", null), "Your browser does not support the", h("code", null, "video"), "element."));
        return this.viewType === ViewType.Audio ? audio : video;
      }
      get host() { return this; }
      static get watchers() { return {
        "mediaTitle": ["onMediaTitleChange"],
        "poster": ["onPosterChange"],
        "viewType": ["onViewTypeChange"],
        "hasCustomTextManager": ["onHasCustomTextManagerChange"],
        "shouldRenderNativeTextTracks": ["onShouldRenderNativeTextTracksChange"]
      }; }
      static get style() { return fileCss; }
    };

    const fullscreenControlCss = ":host([hidden]){display:none}";

    var __awaiter$g = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const FullscreenControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetFullscreen = false;
        /**
         * The name of the enter fullscreen icon to resolve from the icon library.
         */
        this.enterIcon = 'fullscreen-enter';
        /**
         * The name of the exit fullscreen icon to resolve from the icon library.
         */
        this.exitIcon = 'fullscreen-exit';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @inheritdoc */
        this.keys = 'f';
        /** @internal */
        this.isFullscreenActive = false;
        /** @internal */
        this.i18n = {};
        /** @internal */
        this.playbackReady = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isFullscreenActive', 'playbackReady', 'i18n']);
      }
      onPlaybackReadyChange() {
        var _a;
        return __awaiter$g(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetFullscreen = (_a = (yield (player === null || player === void 0 ? void 0 : player.canSetFullscreen()))) !== null && _a !== void 0 ? _a : false;
        });
      }
      componentDidLoad() {
        this.onPlaybackReadyChange();
      }
      onClick() {
        const player = getPlayerFromRegistry(this);
        !this.isFullscreenActive
          ? player === null || player === void 0 ? void 0 : player.enterFullscreen()
          : player === null || player === void 0 ? void 0 : player.exitFullscreen();
      }
      render() {
        const tooltip = this.isFullscreenActive
          ? this.i18n.exitFullscreen
          : this.i18n.enterFullscreen;
        const tooltipWithHint = !isUndefined(this.keys)
          ? `${tooltip} (${this.keys})`
          : tooltip;
        return (h(Host, { hidden: !this.canSetFullscreen }, h("vm-control", { label: this.i18n.fullscreen, keys: this.keys, pressed: this.isFullscreenActive, hidden: !this.canSetFullscreen, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isFullscreenActive ? this.exitIcon : this.enterIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint))));
      }
      static get watchers() { return {
        "playbackReady": ["onPlaybackReadyChange"]
      }; }
      static get style() { return fullscreenControlCss; }
    };

    var __awaiter$f = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const HLS = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.hasAttached = false;
        /**
         * The NPM package version of the `hls.js` library to download and use if HLS is not natively
         * supported.
         */
        this.version = 'latest';
        /** @inheritdoc */
        this.preload = 'metadata';
        /** @internal */
        this.playbackReady = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withPlayerContext(this, ['playbackReady']);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        if (this.mediaEl)
          this.setupHls();
      }
      disconnectedCallback() {
        this.destroyHls();
      }
      get src() {
        if (isNil(this.videoProvider))
          return undefined;
        const sources = this.videoProvider.querySelectorAll('source');
        const currSource = Array.from(sources).find(source => hlsRegex.test(source.src) || hlsTypeRegex.test(source.type));
        return currSource === null || currSource === void 0 ? void 0 : currSource.src;
      }
      setupHls() {
        return __awaiter$f(this, void 0, void 0, function* () {
          if (!isUndefined(this.hls))
            return;
          try {
            const url = this.libSrc ||
              `https://cdn.jsdelivr.net/npm/hls.js@${this.version}/dist/hls.min.js`;
            const Hls = (yield loadSDK(url, 'Hls'));
            if (!Hls.isSupported()) {
              this.vmError.emit('hls.js is not supported');
              return;
            }
            this.hls = new Hls(this.config);
            this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
              this.hasAttached = true;
              this.onSrcChange();
            });
            this.hls.on(Hls.Events.AUDIO_TRACKS_UPDATED, () => {
              this.dispatch('audioTracks', this.hls.audioTracks);
              this.dispatch('currentAudioTrack', this.hls.audioTrack);
            });
            this.hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, () => {
              this.dispatch('currentAudioTrack', this.hls.audioTrack);
            });
            this.hls.on(Hls.Events.ERROR, (event, data) => {
              if (data.fatal) {
                switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                    this.hls.startLoad();
                    break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                    this.hls.recoverMediaError();
                    break;
                  default:
                    this.destroyHls();
                    break;
                }
              }
              this.vmError.emit({ event, data });
            });
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
              this.dispatch('mediaType', MediaType.Video);
              this.dispatch('currentSrc', this.src);
              this.dispatchLevels();
            });
            this.hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
              if (!this.playbackReady) {
                this.dispatch('duration', data.details.totalduration);
                this.dispatch('playbackReady', true);
              }
            });
            this.hls.attachMedia(this.mediaEl);
          }
          catch (e) {
            this.vmError.emit(e);
          }
        });
      }
      dispatchLevels() {
        if (!this.hls.levels || this.hls.levels.length === 0)
          return;
        this.dispatch('playbackQualities', [
          'Auto',
          ...this.hls.levels.map(this.levelToPlaybackQuality),
        ]);
        this.dispatch('playbackQuality', 'Auto');
      }
      levelToPlaybackQuality(level) {
        return level === -1 ? 'Auto' : `${level.height}p`;
      }
      findLevelIndexFromQuality(quality) {
        return this.hls.levels.findIndex((level) => this.levelToPlaybackQuality(level) === quality);
      }
      destroyHls() {
        var _a;
        (_a = this.hls) === null || _a === void 0 ? void 0 : _a.destroy();
        this.hasAttached = false;
      }
      onMediaElChange(event) {
        return __awaiter$f(this, void 0, void 0, function* () {
          this.destroyHls();
          if (isUndefined(event.detail))
            return;
          this.mediaEl = event.detail;
          // Need a small delay incase the media element changes rapidly and Hls.js can't reattach.
          setTimeout(() => __awaiter$f(this, void 0, void 0, function* () {
            yield this.setupHls();
          }), 50);
        });
      }
      onSrcChange() {
        var _a;
        return __awaiter$f(this, void 0, void 0, function* () {
          if (this.hasAttached && this.hls.url !== this.src) {
            this.vmLoadStart.emit();
            (_a = this.hls) === null || _a === void 0 ? void 0 : _a.loadSource(this.src);
          }
        });
      }
      /** @internal */
      getAdapter() {
        var _a, _b;
        return __awaiter$f(this, void 0, void 0, function* () {
          const adapter = (_b = (yield ((_a = this.videoProvider) === null || _a === void 0 ? void 0 : _a.getAdapter()))) !== null && _b !== void 0 ? _b : {};
          const canVideoProviderPlay = adapter.canPlay;
          return Object.assign(Object.assign({}, adapter), { getInternalPlayer: () => __awaiter$f(this, void 0, void 0, function* () { return this.hls; }), canPlay: (type) => __awaiter$f(this, void 0, void 0, function* () {
              var _c;
              return (isString(type) && hlsRegex.test(type)) ||
                ((_c = canVideoProviderPlay === null || canVideoProviderPlay === void 0 ? void 0 : canVideoProviderPlay(type)) !== null && _c !== void 0 ? _c : false);
            }), canSetPlaybackQuality: () => __awaiter$f(this, void 0, void 0, function* () { var _d, _e; return ((_e = (_d = this.hls) === null || _d === void 0 ? void 0 : _d.levels) === null || _e === void 0 ? void 0 : _e.length) > 0; }), setPlaybackQuality: (quality) => __awaiter$f(this, void 0, void 0, function* () {
              if (!isUndefined(this.hls)) {
                this.hls.currentLevel = this.findLevelIndexFromQuality(quality);
                // Update the provider cache.
                this.dispatch('playbackQuality', quality);
              }
            }), setCurrentAudioTrack: (trackId) => __awaiter$f(this, void 0, void 0, function* () {
              if (!isUndefined(this.hls)) {
                this.hls.audioTrack = trackId;
              }
            }) });
        });
      }
      render() {
        return (h("vm-video", { willAttach: true, crossOrigin: this.crossOrigin, preload: this.preload, poster: this.poster, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, disableRemotePlayback: this.disableRemotePlayback, mediaTitle: this.mediaTitle, ref: (el) => {
            this.videoProvider = el;
          } }, h("slot", null)));
      }
    };

    /**
     * INSPIRED BY: https://github.com/shoelace-style/shoelace/blob/next/src/components/icon-library/icon-library-registry.ts
     */
    const ICONS_BASE_CDN_URL = 'https://cdn.jsdelivr.net/npm/@vime/core@latest/icons';
    const registry = new Map(Object.entries({
      vime: iconName => `${ICONS_BASE_CDN_URL}/vime/vm-${iconName}.svg`,
      material: iconName => `${ICONS_BASE_CDN_URL}/material/md-${iconName}.svg`,
    }));
    const watch = new Set();
    function withIconRegistry(component) {
      const el = getElement(component);
      createStencilHook(component, () => {
        watch.add(el);
      }, () => {
        watch.delete(el);
      });
    }
    const getIconLibraryResolver = (name) => registry.get(name);
    function registerIconLibrary(name, resolver) {
      if (!isUndefined(resolver)) {
        registry.set(name, resolver);
      }
      // Redraw watched icons.
      watch.forEach(iconEl => {
        if (iconEl.library === name)
          iconEl.redraw();
      });
    }
    function deregisterIconLibrary(name) {
      registry.delete(name);
    }

    /**
     * INSPIRED BY: https://github.com/shoelace-style/shoelace/blob/next/src/components/icon/request.ts
     */
    var __awaiter$e = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const iconFiles = new Map();
    const requestIcon = (url) => {
      if (iconFiles.has(url))
        return iconFiles.get(url);
      const request = fetch(url).then((response) => __awaiter$e(void 0, void 0, void 0, function* () {
        if (response.ok) {
          const div = document.createElement('div');
          div.innerHTML = yield response.text();
          const svg = div.firstElementChild;
          return {
            ok: response.ok,
            status: response.status,
            svg: svg && svg.tagName.toLowerCase() === 'svg' ? svg.outerHTML : '',
          };
        }
        return {
          ok: response.ok,
          status: response.status,
        };
      }));
      iconFiles.set(url, request);
      return request;
    };

    const iconCss = ":host{display:inline-block;width:1em;height:1em;contain:strict;box-sizing:content-box !important}.icon,svg{display:block;height:100%;width:100%;transition:var(--vm-icon-transition);transform:var(--vm-icon-transform);fill:var(--vm-icon-fill, currentColor);stroke:var(--vm-icon-stroke)}";

    /**
     * INSPIRED BY: https://github.com/shoelace-style/shoelace/blob/next/src/components/icon/icon.tsx
     */
    var __awaiter$d = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const parser = new DOMParser();
    const Icon = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoad = createEvent(this, "vmLoad", 7);
        this.vmError = createEvent(this, "vmError", 7);
        /** @internal */
        this.icons = 'material';
        withComponentRegistry(this);
        withIconRegistry(this);
      }
      handleChange() {
        this.setIcon();
      }
      connectedCallback() {
        withPlayerContext(this, ['icons']);
      }
      componentDidLoad() {
        this.setIcon();
      }
      /**
       * @internal Fetches the icon and redraws it. Used to handle library registrations.
       */
      redraw() {
        return __awaiter$d(this, void 0, void 0, function* () {
          this.setIcon();
        });
      }
      getLabel() {
        let label = '';
        if (this.label) {
          label = this.label;
        }
        else if (this.name) {
          label = this.name.replace(/-/g, ' ');
        }
        else if (this.src) {
          label = this.src
            .replace(/.*\//, '')
            .replace(/-/g, ' ')
            .replace(/\.svg/i, '');
        }
        return label;
      }
      setIcon() {
        var _a;
        return __awaiter$d(this, void 0, void 0, function* () {
          const resolver = getIconLibraryResolver((_a = this.library) !== null && _a !== void 0 ? _a : this.icons);
          let url = this.src;
          if (this.name && resolver) {
            url = resolver(this.name);
          }
          if (url) {
            try {
              const file = yield requestIcon(url);
              if (file.ok) {
                const doc = parser.parseFromString(file.svg, 'text/html');
                const svg = doc.body.querySelector('svg');
                if (svg) {
                  this.svg = svg.outerHTML;
                  this.vmLoad.emit();
                }
                else {
                  this.svg = '';
                  this.vmError.emit({ status: file.status });
                }
              }
            }
            catch (_b) {
              this.vmError.emit();
            }
          }
        });
      }
      render() {
        return (h("div", { class: "icon", role: "img", "aria-label": this.getLabel(), innerHTML: this.svg }));
      }
      static get watchers() { return {
        "name": ["handleChange"],
        "src": ["handleChange"],
        "library": ["handleChange"],
        "icons": ["handleChange"]
      }; }
      static get style() { return iconCss; }
    };

    const IconLibrary = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.icons = 'material';
        withComponentRegistry(this);
        withPlayerContext(this, ['icons']);
      }
      handleUpdate() {
        this.register();
      }
      connectedCallback() {
        this.register();
      }
      disconnectedCallback() {
        if (!isUndefined(this.name))
          deregisterIconLibrary(this.name);
      }
      register() {
        var _a;
        registerIconLibrary((_a = this.name) !== null && _a !== void 0 ? _a : this.icons, this.name ? this.resolver : undefined);
      }
      get host() { return this; }
      static get watchers() { return {
        "name": ["handleUpdate"],
        "resolver": ["handleUpdate"],
        "icons": ["handleUpdate"]
      }; }
    };

    const liveIndicatorCss = ".liveIndicator{display:flex;align-items:center;font-size:13px;font-weight:bold;letter-spacing:0.6px;color:var(--vm-control-color)}.liveIndicator.hidden{display:none}.indicator{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;background-color:var(--vm-live-indicator-color, red)}";

    const LiveIndicator = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.isLive = false;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ['isLive', 'i18n']);
      }
      render() {
        return (h("div", { class: {
            liveIndicator: true,
            hidden: !this.isLive,
          } }, h("div", { class: "indicator" }), this.i18n.live));
      }
      static get style() { return liveIndicatorCss; }
    };

    const loadingScreenCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-loading-screen-z-index);display:flex;align-items:center;justify-content:center}.loadingScreen{opacity:100;transition:var(--vm-fade-transition)}.loadingScreen.inactive{opacity:0}.dotPulse{position:relative;left:-9999px;width:var(--vm-loading-screen-dot-size);height:var(--vm-loading-screen-dot-size);border-radius:calc(var(--vm-loading-screen-dot-size) / 2);background-color:var(--vm-loading-screen-dot-color);color:var(--vm-loading-screen-dot-color);box-shadow:9999px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulse var(--vm-loading-screen-pulse-duration) infinite linear;animation-delay:calc(var(--vm-loading-screen-pulse-duration) / 6)}.dotPulse::before,.dotPulse::after{content:'';display:inline-block;position:absolute;top:0;width:var(--vm-loading-screen-dot-size);height:var(--vm-loading-screen-dot-size);border-radius:calc(var(--vm-loading-screen-dot-size) / 2);background-color:var(--vm-loading-screen-dot-color);color:var(--vm-loading-screen-dot-color)}.dotPulse::before{box-shadow:9984px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulseBefore var(--vm-loading-screen-pulse-duration) infinite\n    linear;animation-delay:0s}.dotPulse::after{box-shadow:10014px 0 0 calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n    var(--vm-loading-screen-dot-color);animation:dotPulseAfter var(--vm-loading-screen-pulse-duration) infinite\n    linear;animation-delay:calc(var(--vm-loading-screen-pulse-duration) / 3)}@keyframes dotPulseBefore{0%{box-shadow:9984px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:9984px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:9984px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}@keyframes dotPulse{0%{box-shadow:9999px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:9999px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:9999px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}@keyframes dotPulseAfter{0%{box-shadow:10014px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}30%{box-shadow:10014px 0 0 2px var(--vm-loading-screen-dot-color)}60%,100%{box-shadow:10014px 0 0\n      calc(calc(var(--vm-loading-screen-dot-size) / 2) * -1)\n      var(--vm-loading-screen-dot-color)}}";

    const LoadingScreen = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.playbackReady = false;
        /**
         * Whether the loading dots are hidden or not.
         */
        this.hideDots = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['playbackReady']);
      }
      render() {
        return (h("div", { class: {
            loadingScreen: true,
            inactive: this.playbackReady,
          } }, h("slot", null), !this.hideDots && h("div", { class: "dotPulse" })));
      }
      static get style() { return loadingScreenCss; }
    };

    function unwrapSubmenu(el) {
      if (el.tagName.toLowerCase() !== 'vm-submenu')
        return el;
      const submenu = el;
      return submenu.shadowRoot.querySelector('vm-menu-item');
    }
    function unwrapRadioGroup(el) {
      var _a;
      if (el.tagName.toLowerCase() !== 'vm-menu-radio-group')
        return el;
      const radioGroup = el;
      const slot = radioGroup.shadowRoot.querySelector('slot');
      const assignedElements = Array.from((_a = slot === null || slot === void 0 ? void 0 : slot.assignedElements()) !== null && _a !== void 0 ? _a : []);
      return assignedElements
        .filter(radio => radio.tagName.toLowerCase() === 'vm-menu-radio')
        .map(radio => radio.shadowRoot.querySelector('vm-menu-item'));
    }
    function menuItemHunter(assignedElements) {
      if (isUndefined(assignedElements))
        return [];
      const allowed = ['vm-menu-item', 'vm-menu-radio-group', 'vm-submenu'];
      return Array.from(assignedElements !== null && assignedElements !== void 0 ? assignedElements : [])
        .filter(el => allowed.includes(el.tagName.toLowerCase()))
        .map(el => unwrapSubmenu(el))
        .map(el => unwrapRadioGroup(el))
        .reduce((acc, val) => acc.concat(val), []);
    }

    const menuCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:var(--vm-menu-z-index)}:host([active]){pointer-events:auto;z-index:calc(var(--vm-menu-z-index) + 1)}.menu{position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;transition:var(--vm-menu-transition)}.menu.slideIn{transform:translateX(0)}.menu[aria-hidden='true'].slideInFromLeft{transform:translateX(-100%)}.menu[aria-hidden='true'].slideInFromRight{transform:translateX(100%)}.container{display:flex;flex-direction:column;position:relative;text-align:left;width:100%;height:100%;color:var(--vm-menu-color);background:var(--vm-menu-bg);font-size:var(--vm-menu-font-size);font-weight:var(--vm-menu-font-weight)}.menu:focus{outline:0}";

    var __awaiter$c = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Menu = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmOpen = createEvent(this, "vmOpen", 7);
        this.vmClose = createEvent(this, "vmClose", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.vmActiveSubmenuChange = createEvent(this, "vmActiveSubmenuChange", 7);
        this.vmActiveMenuItemChange = createEvent(this, "vmActiveMenuItemChange", 7);
        this.vmMenuHeightChange = createEvent(this, "vmMenuHeightChange", 3);
        this.hasDisconnected = false;
        /**
         * Whether the menu is open/visible.
         */
        this.active = false;
        withComponentRegistry(this);
      }
      onActiveMenuitemChange() {
        this.vmActiveMenuItemChange.emit(this.activeMenuItem);
      }
      onActiveSubmenuChange() {
        this.vmActiveSubmenuChange.emit(this.activeSubmenu);
      }
      onActiveChange() {
        var _a;
        if (this.hasDisconnected)
          return;
        this.active ? this.vmOpen.emit(this.host) : this.vmClose.emit(this.host);
        if (((_a = this.controller) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'vm-menu-item') {
          this.controller.expanded = true;
        }
      }
      connectedCallback() {
        this.hasDisconnected = false;
      }
      componentDidRender() {
        writeTask(() => {
          if (!this.hasDisconnected)
            this.calculateHeight();
        });
      }
      disconnectedCallback() {
        this.controller = undefined;
        this.hasDisconnected = true;
      }
      /**
       * Focuses the menu.
       */
      focusMenu() {
        var _a;
        return __awaiter$c(this, void 0, void 0, function* () {
          (_a = this.menu) === null || _a === void 0 ? void 0 : _a.focus();
        });
      }
      /**
       * Removes focus from the menu.
       */
      blurMenu() {
        var _a;
        return __awaiter$c(this, void 0, void 0, function* () {
          (_a = this.menu) === null || _a === void 0 ? void 0 : _a.blur();
        });
      }
      /**
       * Returns the currently focused menu item.
       */
      getActiveMenuItem() {
        return __awaiter$c(this, void 0, void 0, function* () {
          return this.activeMenuItem;
        });
      }
      /**
       * Sets the currently focused menu item.
       */
      setActiveMenuItem(item) {
        return __awaiter$c(this, void 0, void 0, function* () {
          item === null || item === void 0 ? void 0 : item.focusItem();
          this.activeMenuItem = item;
        });
      }
      /**
       * Calculates the height of the settings menu based on its children.
       */
      calculateHeight() {
        var _a, _b;
        return __awaiter$c(this, void 0, void 0, function* () {
          let height = 0;
          if (this.activeSubmenu) {
            const submenu = yield this.activeSubmenu.getMenu();
            height = (_a = (yield (submenu === null || submenu === void 0 ? void 0 : submenu.calculateHeight()))) !== null && _a !== void 0 ? _a : 0;
            height += yield this.activeSubmenu.getControllerHeight();
          }
          else {
            const children = ((_b = this.container) === null || _b === void 0 ? void 0 : _b.firstChild).assignedElements({ flatten: true });
            children === null || children === void 0 ? void 0 : children.forEach(child => {
              height += parseFloat(window.getComputedStyle(child).height);
            });
          }
          this.vmMenuHeightChange.emit(height);
          return height;
        });
      }
      onOpenSubmenu(event) {
        event.stopPropagation();
        if (!isUndefined(this.activeSubmenu))
          this.activeSubmenu.active = false;
        this.activeSubmenu = event.detail;
        this.getChildren().forEach(child => {
          if (child !== this.activeSubmenu) {
            child.style.opacity = '0';
            child.style.visibility = 'hidden';
          }
        });
        writeTask(() => {
          this.activeSubmenu.active = true;
        });
      }
      onCloseSubmenu(event) {
        event === null || event === void 0 ? void 0 : event.stopPropagation();
        if (!isUndefined(this.activeSubmenu))
          this.activeSubmenu.active = false;
        this.getChildren().forEach(child => {
          if (child !== this.activeSubmenu) {
            child.style.opacity = '';
            child.style.visibility = '';
          }
        });
        writeTask(() => {
          this.activeSubmenu = undefined;
        });
      }
      onWindowClick() {
        this.onCloseSubmenu();
        this.onClose();
      }
      onWindowKeyDown(event) {
        if (this.active && event.key === 'Escape') {
          this.onCloseSubmenu();
          this.onClose();
          this.focusController();
        }
      }
      getChildren() {
        var _a;
        const assignedElements = (_a = this.host
          .shadowRoot.querySelector('slot')) === null || _a === void 0 ? void 0 : _a.assignedElements({ flatten: true });
        return (assignedElements !== null && assignedElements !== void 0 ? assignedElements : []);
      }
      getMenuItems() {
        var _a;
        const assignedElements = (_a = this.host
          .shadowRoot.querySelector('slot')) === null || _a === void 0 ? void 0 : _a.assignedElements({ flatten: true });
        return menuItemHunter(assignedElements);
      }
      focusController() {
        var _a, _b, _c, _d, _e;
        if (!isUndefined((_a = this.controller) === null || _a === void 0 ? void 0 : _a.focusItem)) {
          (_b = this.controller) === null || _b === void 0 ? void 0 : _b.focusItem();
        }
        else if (!isUndefined((_c = this.controller) === null || _c === void 0 ? void 0 : _c.focusControl)) {
          (_d = this.controller) === null || _d === void 0 ? void 0 : _d.focusControl();
        }
        else {
          (_e = this.controller) === null || _e === void 0 ? void 0 : _e.focus();
        }
      }
      triggerMenuItem() {
        var _a;
        if (isUndefined(this.activeMenuItem))
          return;
        this.activeMenuItem.click();
        // If it controls a menu then focus it essentially opening it.
        (_a = this.activeMenuItem.menu) === null || _a === void 0 ? void 0 : _a.focusMenu();
      }
      onClose() {
        this.activeMenuItem = undefined;
        this.active = false;
      }
      onClick(event) {
        // Stop the event from propagating while playing with menu so that when it is clicked outside
        // the menu we can close it in the `onWindowClick` handler above.
        event.stopPropagation();
      }
      onFocus() {
        var _a;
        this.active = true;
        [this.activeMenuItem] = this.getMenuItems();
        (_a = this.activeMenuItem) === null || _a === void 0 ? void 0 : _a.focusItem();
        this.vmFocus.emit();
      }
      onBlur() {
        this.vmBlur.emit();
      }
      foucsMenuItem(items, index) {
        if (index < 0)
          index = items.length - 1;
        if (index > items.length - 1)
          index = 0;
        this.activeMenuItem = items[index];
        this.activeMenuItem.focusItem();
      }
      onKeyDown(event) {
        if (!this.active)
          return;
        event.preventDefault();
        event.stopPropagation();
        const items = this.getMenuItems();
        let index = items.findIndex(item => item === this.activeMenuItem);
        switch (event.key) {
          case 'Escape':
            this.onClose();
            this.focusController();
            break;
          case 'ArrowDown':
          case 'Tab':
            this.foucsMenuItem(items, (index += 1));
            break;
          case 'ArrowUp':
            this.foucsMenuItem(items, (index -= 1));
            break;
          case 'ArrowLeft':
            this.onClose();
            this.focusController();
            break;
          case 'ArrowRight':
          case 'Enter':
          case ' ':
            this.triggerMenuItem();
            break;
          case 'Home':
          case 'PageUp':
            this.foucsMenuItem(items, 0);
            break;
          case 'End':
          case 'PageDown':
            this.foucsMenuItem(items, items.length - 1);
            break;
        }
      }
      render() {
        var _a, _b, _c;
        return (h("div", { id: this.identifier, class: {
            menu: true,
            slideIn: !isUndefined(this.slideInDirection),
            slideInFromLeft: this.slideInDirection === 'left',
            slideInFromRight: this.slideInDirection === 'right',
          }, role: "menu", tabindex: "-1", "aria-labelledby": (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.identifier) !== null && _b !== void 0 ? _b : (_c = this.controller) === null || _c === void 0 ? void 0 : _c.id, "aria-hidden": !this.active ? 'true' : 'false', onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onClick: this.onClick.bind(this), onKeyDown: this.onKeyDown.bind(this), ref: el => {
            this.menu = el;
          } }, h("div", { class: "container", ref: el => {
            this.container = el;
          } }, h("slot", null))));
      }
      get host() { return this; }
      static get watchers() { return {
        "activeMenuItem": ["onActiveMenuitemChange"],
        "activeSubmenu": ["onActiveSubmenuChange"],
        "active": ["onActiveChange"]
      }; }
      static get style() { return menuCss; }
    };

    const menuItemCss = ":host{display:block}.menuItem{display:flex;position:relative;align-items:center;flex-direction:row;cursor:pointer;color:var(--vm-menu-color);background:var(--vm-menu-bg);font-size:var(--vm-menu-font-size);font-weight:var(--vm-menu-font-weight);padding:var(--vm-menu-item-padding);touch-action:manipulation;box-sizing:border-box}.menuItem:focus{outline:0}.menuItem.hidden{display:none}.menuItem.tapHighlight{background:var(--vm-menu-item-tap-highlight)}.menuItem.showDivider{border-bottom:0.5px solid var(--vm-menu-item-divider-color)}.menuItem.notTouch:hover,.menuItem.notTouch:focus{outline:0;color:var(--vm-menu-item-focus-color);background-color:var(--vm-menu-item-focus-bg)}.menuItem[aria-expanded='true']{position:absolute;z-index:2;top:0;width:100%}.menuItem[aria-hidden='true']{display:none}.menuItem[aria-checked='true'] vm-icon{opacity:1;visibility:visible}vm-icon{display:inline-block}vm-icon{fill:currentColor;pointer-events:none;font-size:var(--vm-menu-item-check-icon-size);margin-right:10px;opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.hint{display:inline-block;margin-left:auto;overflow:hidden;pointer-events:none;margin-right:6px;font-size:var(--vm-menu-item-hint-font-size);opacity:var(--vm-menu-item-hint-opacity);color:var(--vm-menu-item-hint-color)}.badge{display:inline-block;line-height:1;overflow:hidden;pointer-events:none;margin-left:6px;color:var(--vm-menu-item-badge-color);background:var(--vm-menu-item-badge-bg);font-size:var(--vm-menu-item-badge-font-size)}.spacer{flex:1}.arrow{color:var(--vm-menu-item-arrow-color);border:2px solid;padding:2px;display:inline-block;border-width:0 2px 2px 0}.arrow.left{margin-right:6px;transform:rotate(135deg)}.arrow.right{transform:rotate(-45deg);opacity:0.38}";

    var __awaiter$b = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const MenuItem = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        this.showTapHighlight = false;
        /**
         * Whether the item is displayed or not.
         */
        this.hidden = false;
        /**
         * The name of the checkmark icon to resolve from the icon library.
         */
        this.checkIcon = 'check';
        /** @internal */
        this.isTouch = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isTouch']);
      }
      /**
       * Focuses the menu item.
       */
      focusItem() {
        var _a;
        return __awaiter$b(this, void 0, void 0, function* () {
          (_a = this.menuItem) === null || _a === void 0 ? void 0 : _a.focus();
        });
      }
      /**
       * Removes focus from the menu item.
       */
      blurItem() {
        var _a;
        return __awaiter$b(this, void 0, void 0, function* () {
          (_a = this.menuItem) === null || _a === void 0 ? void 0 : _a.blur();
        });
      }
      /**
       * Returns the height of the menu item.
       */
      getHeight() {
        return __awaiter$b(this, void 0, void 0, function* () {
          return parseFloat(this.menuItem ? window.getComputedStyle(this.menuItem).height : '0');
        });
      }
      onClick() {
        if (!isNil(this.menu))
          this.menu.active = !this.expanded;
      }
      onFocus() {
        this.vmFocus.emit();
      }
      onBlur() {
        this.vmBlur.emit();
      }
      onTouchStart() {
        this.showTapHighlight = true;
      }
      onTouchEnd() {
        setTimeout(() => {
          this.showTapHighlight = false;
        }, 100);
      }
      onMouseLeave() {
        var _a;
        (_a = this.menuItem) === null || _a === void 0 ? void 0 : _a.blur();
      }
      render() {
        var _a, _b, _c, _d;
        const isCheckedDefined = !isUndefined(this.checked);
        const isMenuDefined = !isUndefined(this.menu);
        const hasExpanded = this.expanded ? 'true' : 'false';
        const isChecked = this.checked ? 'true' : 'false';
        const showCheckedIcon = isCheckedDefined && !isUndefined(this.checkIcon);
        const showLeftNavArrow = isMenuDefined && this.expanded;
        const showRightNavArrow = isMenuDefined && !this.expanded;
        const showHint = !isUndefined(this.hint) &&
          !isCheckedDefined &&
          (!isMenuDefined || !this.expanded);
        const showBadge = !isUndefined(this.badge) && !showHint && !showRightNavArrow;
        const hasSpacer = showHint || showRightNavArrow;
        return (h("div", { class: {
            menuItem: true,
            notTouch: !this.isTouch,
            tapHighlight: this.showTapHighlight,
            showDivider: isMenuDefined && ((_a = this.expanded) !== null && _a !== void 0 ? _a : false),
          }, id: this.identifier, role: isCheckedDefined ? 'menuitemradio' : 'menuitem', tabindex: "0", "aria-label": this.label, "aria-hidden": this.hidden ? 'true' : 'false', "aria-haspopup": isMenuDefined ? 'true' : undefined, "aria-controls": (_c = (_b = this.menu) === null || _b === void 0 ? void 0 : _b.identifier) !== null && _c !== void 0 ? _c : (_d = this.menu) === null || _d === void 0 ? void 0 : _d.id, "aria-expanded": isMenuDefined ? hasExpanded : undefined, "aria-checked": isCheckedDefined ? isChecked : undefined, onClick: this.onClick.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onTouchStart: this.onTouchStart.bind(this), onTouchEnd: this.onTouchEnd.bind(this), onMouseLeave: this.onMouseLeave.bind(this), ref: el => {
            this.menuItem = el;
          } }, showCheckedIcon && (h("vm-icon", { name: this.checkIcon, library: this.icons })), showLeftNavArrow && h("span", { class: "arrow left" }), this.label, hasSpacer && h("span", { class: "spacer" }), showHint && h("span", { class: "hint" }, this.hint), showBadge && h("span", { class: "badge" }, this.badge), showRightNavArrow && h("span", { class: "arrow right" })));
      }
      get host() { return this; }
      static get style() { return menuItemCss; }
    };

    const MenuRadio = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmCheck = createEvent(this, "vmCheck", 7);
        /**
         * Whether the radio item is selected or not.
         */
        this.checked = false;
        /**
         * The URL to an SVG element or fragment to load.
         */
        this.checkIcon = 'check';
        withComponentRegistry(this);
      }
      onClick() {
        this.checked = true;
        this.vmCheck.emit();
      }
      render() {
        return (h("vm-menu-item", { label: this.label, checked: this.checked, badge: this.badge, checkIcon: this.checkIcon, icons: this.icons, onClick: this.onClick.bind(this) }));
      }
    };

    const MenuRadioGroup = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmCheck = createEvent(this, "vmCheck", 7);
        withComponentRegistry(this);
      }
      onValueChange() {
        var _a;
        (_a = this.findRadios()) === null || _a === void 0 ? void 0 : _a.forEach(radio => {
          radio.checked = radio.value === this.value;
        });
      }
      connectedCallback() {
        this.onValueChange();
      }
      componentDidLoad() {
        this.onValueChange();
      }
      onSelectionChange(event) {
        const radio = event.target;
        this.value = radio.value;
      }
      findRadios() {
        var _a;
        return (_a = this.host
          .shadowRoot.querySelector('slot')) === null || _a === void 0 ? void 0 : _a.assignedElements();
      }
      render() {
        return h("slot", null);
      }
      get host() { return this; }
      static get watchers() { return {
        "value": ["onValueChange"]
      }; }
    };

    const MuteControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        /**
         * The name of the low volume icon to resolve from the icon library.
         */
        this.lowVolumeIcon = 'volume-low';
        /**
         * The name of the high volume icon to resolve from the icon library.
         */
        this.highVolumeIcon = 'volume-high';
        /**
         * The name of the muted volume icon to resolve from the icon library.
         */
        this.mutedIcon = 'volume-mute';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @inheritdoc */
        this.keys = 'm';
        /** @internal */
        this.volume = 50;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ['muted', 'volume', 'i18n']);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      getIcon() {
        const volumeIcon = this.volume < 50 ? this.lowVolumeIcon : this.highVolumeIcon;
        return this.muted || this.volume === 0 ? this.mutedIcon : volumeIcon;
      }
      onClick() {
        this.dispatch('muted', !this.muted);
      }
      render() {
        const tooltip = this.muted ? this.i18n.unmute : this.i18n.mute;
        const tooltipWithHint = !isUndefined(this.keys)
          ? `${tooltip} (${this.keys})`
          : tooltip;
        return (h("vm-control", { label: this.i18n.mute, pressed: this.muted, keys: this.keys, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.getIcon(), library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint)));
      }
    };

    const pipControlCss = ":host([hidden]){display:none}";

    var __awaiter$a = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const PiPControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.canSetPiP = false;
        /**
         * The name of the enter pip icon to resolve from the icon library.
         */
        this.enterIcon = 'pip-enter';
        /**
         * The name of the exit pip icon to resolve from the icon library.
         */
        this.exitIcon = 'pip-exit';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @inheritdoc */
        this.keys = 'p';
        /** @internal */
        this.isPiPActive = false;
        /** @internal */
        this.i18n = {};
        /** @internal */
        this.playbackReady = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isPiPActive', 'playbackReady', 'i18n']);
      }
      onPlaybackReadyChange() {
        var _a;
        return __awaiter$a(this, void 0, void 0, function* () {
          const player = getPlayerFromRegistry(this);
          this.canSetPiP = (_a = (yield (player === null || player === void 0 ? void 0 : player.canSetPiP()))) !== null && _a !== void 0 ? _a : false;
        });
      }
      componentDidLoad() {
        this.onPlaybackReadyChange();
      }
      onClick() {
        const player = getPlayerFromRegistry(this);
        !this.isPiPActive ? player === null || player === void 0 ? void 0 : player.enterPiP() : player === null || player === void 0 ? void 0 : player.exitPiP();
      }
      render() {
        const tooltip = this.isPiPActive ? this.i18n.exitPiP : this.i18n.enterPiP;
        const tooltipWithHint = !isUndefined(this.keys)
          ? `${tooltip} (${this.keys})`
          : tooltip;
        return (h(Host, { hidden: !this.canSetPiP }, h("vm-control", { label: this.i18n.pip, keys: this.keys, pressed: this.isPiPActive, hidden: !this.canSetPiP, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.isPiPActive ? this.exitIcon : this.enterIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint))));
      }
      static get watchers() { return {
        "playbackReady": ["onPlaybackReadyChange"]
      }; }
      static get style() { return pipControlCss; }
    };

    const PlaybackControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * The name of the play icon to resolve from the icon library.
         */
        this.playIcon = 'play';
        /**
         * The name of the pause icon to resolve from the icon library.
         */
        this.pauseIcon = 'pause';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @inheritdoc */
        this.keys = 'k';
        /** @internal */
        this.paused = true;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ['paused', 'i18n']);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
      }
      onClick() {
        this.dispatch('paused', !this.paused);
      }
      render() {
        const tooltip = this.paused ? this.i18n.play : this.i18n.pause;
        const tooltipWithHint = !isUndefined(this.keys)
          ? `${tooltip} (${this.keys})`
          : tooltip;
        return (h("vm-control", { label: this.i18n.playback, keys: this.keys, pressed: !this.paused, onClick: this.onClick.bind(this) }, h("vm-icon", { name: this.paused ? this.playIcon : this.pauseIcon, library: this.icons }), h("vm-tooltip", { hidden: this.hideTooltip, position: this.tooltipPosition, direction: this.tooltipDirection }, tooltipWithHint)));
      }
    };

    class Logger {
      constructor() {
        this.silent = false;
      }
      log(...args) {
        if (!this.silent && !isUndefined(console))
          console.log('[Vime tip]:', ...args);
      }
      warn(...args) {
        if (!this.silent && !isUndefined(console))
          console.error('[Vime warn]:', ...args);
      }
    }

    const players = new Set();
    function withAutopause(player) {
      const el = getElement(player);
      createStencilHook(player, () => {
        players.add(el);
      }, () => {
        players.delete(el);
      });
    }
    function autopause(player) {
      const el = getElement(player);
      players.forEach(p => {
        if (p !== el && p.autopause)
          p.paused = true;
      });
    }

    /* eslint-disable func-names */
    function withPlayerEvents(player) {
      const el = getElement(player);
      const cache = new Map();
      function initCache() {
        Object.keys(initialState).forEach(prop => {
          cache.set(prop, player[prop]);
        });
      }
      createStencilHook(player, () => {
        initCache();
      }, () => {
        cache.clear();
      });
      const { componentDidRender } = player;
      player.componentDidRender = function () {
        componentDidRender === null || componentDidRender === void 0 ? void 0 : componentDidRender();
        const props = Array.from(cache.keys());
        for (let i = 0; i < props.length; i += 1) {
          const prop = props[i];
          const oldValue = cache.get(prop);
          const newValue = player[prop];
          if (oldValue !== newValue) {
            firePlayerEvent(el, prop, newValue, oldValue);
            cache.set(prop, newValue);
          }
        }
      };
    }

    var __awaiter$9 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    // These changes need to be called immediately to avoid the browser blocking the request.
    const immediateAdapterCall = new Set(['currentTime', 'paused']);
    function withPlayerScheduler(player) {
      const el = getElement(player);
      const disposal = new Disposal();
      const cache = new Map();
      function initCache() {
        Object.keys(initialState).forEach(prop => {
          cache.set(prop, player[prop]);
        });
      }
      // Queue of adapter calls to be run when the media is ready for playback.
      let adapterCalls = [];
      function flushAdapterCalls() {
        return __awaiter$9(this, void 0, void 0, function* () {
          const adapter = yield player.adapter;
          if (isUndefined(adapter))
            return;
          for (let i = 0; i < adapterCalls.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            yield adapterCalls[i](adapter);
          }
          adapterCalls = [];
        });
      }
      let hasMediaChanged = false;
      function onMediaChange(e) {
        e === null || e === void 0 ? void 0 : e.stopImmediatePropagation();
        // Don't reset first time otherwise props intialized by the user will be reset.
        if (!hasMediaChanged) {
          hasMediaChanged = true;
          return;
        }
        adapterCalls = [];
        writeTask(() => {
          Object.keys(initialState)
            .filter(shouldPropResetOnMediaChange)
            .forEach(prop => {
            player[prop] = initialState[prop];
          });
        });
      }
      function onStateChange(event) {
        var _a;
        return __awaiter$9(this, void 0, void 0, function* () {
          event.stopImmediatePropagation();
          const { by, prop, value } = event.detail;
          if (!isWritableProp(prop)) {
            (_a = player.logger) === null || _a === void 0 ? void 0 : _a.warn(`${by.nodeName} tried to change \`${prop}\` but it is readonly.`);
            return;
          }
          if (!player.playbackStarted && immediateAdapterCall.has(prop)) {
            const adapter = yield player.adapter;
            if (prop === 'paused' && !value) {
              adapter === null || adapter === void 0 ? void 0 : adapter.play();
            }
            if (prop === 'currentTime') {
              adapter === null || adapter === void 0 ? void 0 : adapter.play();
              adapter === null || adapter === void 0 ? void 0 : adapter.setCurrentTime(value);
            }
          }
          writeTask(() => {
            player[prop] = value;
          });
        });
      }
      // Called by ProviderConnect.
      const { onProviderDisconnect } = player;
      player.onProviderDisconnect = function () {
        onMediaChange();
        if (onProviderDisconnect)
          onProviderDisconnect.call(player);
      };
      createStencilHook(player, () => {
        initCache();
        disposal.add(listen(el, LOAD_START_EVENT, onMediaChange));
        disposal.add(listen(el, STATE_CHANGE_EVENT, onStateChange));
      }, () => {
        cache.clear();
        disposal.empty();
      });
      wrapStencilHook(player, 'componentWillRender', () => __awaiter$9(this, void 0, void 0, function* () {
        if (player.playbackReady && adapterCalls.length > 0)
          yield flushAdapterCalls();
      }));
      function isAdapterCallRequired(prop, value) {
        var _a;
        return value !== ((_a = player[PROVIDER_CACHE_KEY]) === null || _a === void 0 ? void 0 : _a.get(prop));
      }
      return function safeAdapterCall(prop, method) {
        return __awaiter$9(this, void 0, void 0, function* () {
          if (!isAdapterCallRequired(prop, player[prop]))
            return;
          const value = player[prop];
          const safeCall = (adapter) => __awaiter$9(this, void 0, void 0, function* () {
            var _a;
            try {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              yield ((_a = adapter === null || adapter === void 0 ? void 0 : adapter[method]) === null || _a === void 0 ? void 0 : _a.call(adapter, value));
            }
            catch (e) {
              el.dispatchEvent(new CustomEvent('vmError', { detail: e }));
            }
          });
          if (player.playbackReady) {
            yield safeCall(yield player.adapter);
          }
          else {
            adapterCalls.push(safeCall);
          }
        });
      };
    }

    const playerCss = ".player{box-sizing:border-box;direction:ltr;font-family:var(--vm-player-font-family);-moz-osx-font-smoothing:auto;-webkit-font-smoothing:subpixel-antialiased;-webkit-tap-highlight-color:transparent;font-variant-numeric:tabular-nums;font-weight:500;line-height:1.7;width:100%;display:block;max-width:100%;min-width:275px;min-height:40px;position:relative;text-shadow:none;outline:0;transition:box-shadow 0.3s ease;box-shadow:var(--vm-player-box-shadow);border-radius:var(--vm-player-border-radius)}.player.idle{cursor:none}.player.audio{background-color:transparent !important}.player.video{height:0;overflow:hidden;background-color:var(--vm-player-bg, #000)}.player.fullscreen{margin:0;border-radius:0;width:100%;height:100%;padding-bottom:0 !important}.blocker{position:absolute;top:0;left:0;width:100%;height:100%;display:inline-block;z-index:var(--vm-blocker-z-index)}";

    var __awaiter$8 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let idCount$3 = 0;
    const Player$2 = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmThemeChange = createEvent(this, "vmThemeChange", 7);
        this.vmPausedChange = createEvent(this, "vmPausedChange", 7);
        this.vmPlay = createEvent(this, "vmPlay", 7);
        this.vmPlayingChange = createEvent(this, "vmPlayingChange", 7);
        this.vmSeekingChange = createEvent(this, "vmSeekingChange", 7);
        this.vmSeeked = createEvent(this, "vmSeeked", 7);
        this.vmBufferingChange = createEvent(this, "vmBufferingChange", 7);
        this.vmDurationChange = createEvent(this, "vmDurationChange", 7);
        this.vmCurrentTimeChange = createEvent(this, "vmCurrentTimeChange", 7);
        this.vmReady = createEvent(this, "vmReady", 7);
        this.vmPlaybackReady = createEvent(this, "vmPlaybackReady", 7);
        this.vmPlaybackStarted = createEvent(this, "vmPlaybackStarted", 7);
        this.vmPlaybackEnded = createEvent(this, "vmPlaybackEnded", 7);
        this.vmBufferedChange = createEvent(this, "vmBufferedChange", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmCurrentProviderChange = createEvent(this, "vmCurrentProviderChange", 7);
        this.vmCurrentSrcChange = createEvent(this, "vmCurrentSrcChange", 7);
        this.vmCurrentPosterChange = createEvent(this, "vmCurrentPosterChange", 7);
        this.vmMediaTitleChange = createEvent(this, "vmMediaTitleChange", 7);
        this.vmControlsChange = createEvent(this, "vmControlsChange", 7);
        this.vmPlaybackRateChange = createEvent(this, "vmPlaybackRateChange", 7);
        this.vmPlaybackRatesChange = createEvent(this, "vmPlaybackRatesChange", 7);
        this.vmPlaybackQualityChange = createEvent(this, "vmPlaybackQualityChange", 7);
        this.vmPlaybackQualitiesChange = createEvent(this, "vmPlaybackQualitiesChange", 7);
        this.vmMutedChange = createEvent(this, "vmMutedChange", 7);
        this.vmVolumeChange = createEvent(this, "vmVolumeChange", 7);
        this.vmViewTypeChange = createEvent(this, "vmViewTypeChange", 7);
        this.vmMediaTypeChange = createEvent(this, "vmMediaTypeChange", 7);
        this.vmLiveChange = createEvent(this, "vmLiveChange", 7);
        this.vmTouchChange = createEvent(this, "vmTouchChange", 7);
        this.vmLanguageChange = createEvent(this, "vmLanguageChange", 7);
        this.vmI18nChange = createEvent(this, "vmI18nChange", 7);
        this.vmTranslationsChange = createEvent(this, "vmTranslationsChange", 7);
        this.vmLanguagesChange = createEvent(this, "vmLanguagesChange", 7);
        this.vmFullscreenChange = createEvent(this, "vmFullscreenChange", 7);
        this.vmPiPChange = createEvent(this, "vmPiPChange", 7);
        this.vmTextTracksChange = createEvent(this, "vmTextTracksChange", 7);
        this.vmCurrentTextTrackChange = createEvent(this, "vmCurrentTextTrackChange", 7);
        this.vmTextTrackVisibleChange = createEvent(this, "vmTextTrackVisibleChange", 7);
        this.vmAudioTracksChange = createEvent(this, "vmAudioTracksChange", 7);
        this.vmCurrentAudioTrackChange = createEvent(this, "vmCurrentAudioTrackChange", 7);
        this.disposal = new Disposal();
        /**
         * ------------------------------------------------------
         * Props
         * ------------------------------------------------------
         */
        /** @internal @readonly */
        this.logger = new Logger();
        /** @inheritDoc */
        this.icons = 'vime';
        /** @inheritDoc */
        this.paused = true;
        /** @inheritDoc @readonly */
        this.playing = false;
        /** @inheritDoc @readonly */
        this.duration = -1;
        /** @inheritDoc */
        this.currentTime = 0;
        /** @inheritDoc */
        this.autoplay = false;
        /** @inheritDoc @readonly */
        this.ready = false;
        /** @inheritDoc @readonly */
        this.playbackReady = false;
        /** @inheritDoc */
        this.loop = false;
        /** @inheritDoc */
        this.muted = false;
        /** @inheritDoc @readonly */
        this.buffered = 0;
        /** @inheritDoc */
        this.playbackRate = 1;
        this.lastRateCheck = 1;
        /** @inheritDoc @readonly */
        this.playbackRates = [1];
        /** @inheritDoc @readonly */
        this.playbackQualities = [];
        /** @inheritDoc @readonly */
        this.seeking = false;
        /** @inheritDoc */
        this.debug = false;
        /** @inheritDoc @readonly */
        this.playbackStarted = false;
        /** @inheritDoc @readonly */
        this.playbackEnded = false;
        /** @inheritDoc @readonly */
        this.buffering = false;
        /** @inheritDoc */
        this.controls = false;
        /** @inheritDoc */
        this.isControlsActive = false;
        /** @inheritDoc @readonly */
        this.isSettingsActive = false;
        /** @inheritDoc */
        this.volume = 50;
        /** @inheritDoc @readonly */
        this.isFullscreenActive = false;
        /** @inheritDoc */
        this.aspectRatio = '16:9';
        /** @inheritDoc @readonly */
        this.isAudioView = false;
        /** @inheritDoc @readonly */
        this.isVideoView = false;
        /** @inheritDoc @readonly */
        this.isAudio = false;
        /** @inheritDoc @readonly */
        this.isVideo = false;
        /** @inheritDoc @readonly */
        this.isLive = false;
        /** @inheritDoc @readonly */
        this.isMobile = false;
        /** @inheritDoc @readonly */
        this.isTouch = false;
        /** @inheritDoc @readonly */
        this.isPiPActive = false;
        /** @inheritDoc @readonly */
        this.textTracks = [];
        /** @inheritDoc @readonly */
        this.currentTextTrack = -1;
        /** @inheritDoc @readonly */
        this.isTextTrackVisible = true;
        /** @inheritDoc */
        this.shouldRenderNativeTextTracks = true;
        /** @inheritDoc @readonly */
        this.audioTracks = [];
        /** @inheritDoc @readonly */
        this.currentAudioTrack = -1;
        /** @inheritDoc */
        this.autopause = true;
        /** @inheritDoc */
        this.playsinline = false;
        /** @inheritDoc */
        this.language = 'en';
        /** @inheritDoc */
        this.translations = { en };
        /** @inheritDoc @readonly */
        this.languages = ['en'];
        /** @inheritDoc @readonly */
        this.i18n = en;
        withFindPlayer(this);
        withComponentRegistrar(this);
        withAutopause(this);
        withProviderHost(this);
        withPlayerEvents(this);
        this.safeAdapterCall = withPlayerScheduler(this);
      }
      get adapter() {
        var _a;
        return (_a = this.provider) === null || _a === void 0 ? void 0 : _a.getAdapter();
      }
      onContainerChange() {
        var _a;
        (_a = this.fullscreenController) === null || _a === void 0 ? void 0 : _a.destroy();
        if (isUndefined(this.container))
          return;
        this.fullscreenController = new FullscreenController(this.container);
        this.fullscreenController.on('change', isActive => {
          this.isFullscreenActive = isActive;
          if (isActive)
            this.rotateDevice();
        });
        this.fullscreenController.on('error', error => {
          this.vmError.emit(error);
        });
      }
      onPausedChange() {
        if (this.paused) {
          this.playing = false;
        }
        else {
          autopause(this);
        }
        this.safeAdapterCall('paused', !this.paused ? 'play' : 'pause');
      }
      onDurationChange() {
        this.isLive = this.duration === Infinity;
      }
      onCurrentTimeChange() {
        const duration = this.playbackReady ? this.duration : Infinity;
        this.currentTime = Math.max(0, Math.min(this.currentTime, duration));
        this.safeAdapterCall('currentTime', 'setCurrentTime');
      }
      onPlaybackReadyChange() {
        if (!this.ready)
          this.ready = true;
      }
      onMutedChange() {
        this.safeAdapterCall('muted', 'setMuted');
      }
      onPlaybackRateChange(newRate, prevRate) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (newRate === this.lastRateCheck)
            return;
          if (!(yield ((_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetPlaybackRate) === null || _b === void 0 ? void 0 : _b.call(_a)))) {
            this.logger.log('provider cannot change `playbackRate`.');
            this.lastRateCheck = prevRate;
            this.playbackRate = prevRate;
            return;
          }
          if (!this.playbackRates.includes(newRate)) {
            this.logger.log(`invalid \`playbackRate\` of ${newRate}, ` +
              `valid values are [${this.playbackRates.join(', ')}]`);
            this.lastRateCheck = prevRate;
            this.playbackRate = prevRate;
            return;
          }
          this.lastRateCheck = newRate;
          this.safeAdapterCall('playbackRate', 'setPlaybackRate');
        });
      }
      onPlaybackQualityChange(newQuality, prevQuality) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (isUndefined(newQuality) || newQuality === this.lastQualityCheck)
            return;
          if (!(yield ((_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetPlaybackQuality) === null || _b === void 0 ? void 0 : _b.call(_a)))) {
            this.logger.log('provider cannot change `playbackQuality`.');
            this.lastQualityCheck = prevQuality;
            this.playbackQuality = prevQuality;
            return;
          }
          if (!this.playbackQualities.includes(newQuality)) {
            this.logger.log(`invalid \`playbackQuality\` of ${newQuality}, ` +
              `valid values are [${this.playbackQualities.join(', ')}]`);
            this.lastQualityCheck = prevQuality;
            this.playbackQuality = prevQuality;
            return;
          }
          this.lastQualityCheck = newQuality;
          this.safeAdapterCall('playbackQuality', 'setPlaybackQuality');
        });
      }
      onDebugChange() {
        this.logger.silent = !this.debug;
      }
      onVolumeChange() {
        return __awaiter$8(this, void 0, void 0, function* () {
          this.volume = Math.max(0, Math.min(this.volume, 100));
          this.safeAdapterCall('volume', 'setVolume');
        });
      }
      onViewTypeChange() {
        this.isAudioView = this.viewType === ViewType.Audio;
        this.isVideoView = this.viewType === ViewType.Video;
      }
      onMediaTypeChange() {
        this.isAudio = this.mediaType === MediaType.Audio;
        this.isVideo = this.mediaType === MediaType.Video;
      }
      onLanguageChange(_, prevLanguage) {
        if (!this.languages.includes(this.language)) {
          this.logger.log(`invalid \`language\` of ${this.language}, ` +
            `valid values are [${this.languages.join(', ')}]`);
          this.language = prevLanguage;
          return;
        }
        this.i18n = this.translations[this.language];
      }
      onTranslationsChange() {
        Object.assign(this.translations, { en });
        this.languages = Object.keys(this.translations);
        this.i18n = this.translations[this.language];
      }
      onError(event) {
        this.logger.warn(event.detail);
      }
      /**
       * ------------------------------------------------------
       * Methods
       * ------------------------------------------------------
       */
      /** @inheritDoc */
      getProvider() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.provider;
        });
      }
      /** @internal */
      getAdapter() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.adapter;
        });
      }
      /** @inheritDoc */
      play() {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.play();
        });
      }
      /** @inheritDoc */
      pause() {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.pause();
        });
      }
      /** @inheritDoc */
      canPlay(type) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canPlay(type)) !== null && _b !== void 0 ? _b : false;
        });
      }
      /** @inheritDoc */
      canAutoplay() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return canAutoplay();
        });
      }
      /** @inheritDoc */
      canMutedAutoplay() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return canAutoplay(true);
        });
      }
      /** @inheritDoc */
      canSetPlaybackRate() {
        var _a, _b, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetPlaybackRate) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      canSetPlaybackQuality() {
        var _a, _b, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetPlaybackQuality) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      canSetFullscreen() {
        var _a, _b, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (this.fullscreenController.isSupported ||
            ((_c = (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetFullscreen) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false));
        });
      }
      /** @inheritDoc */
      enterFullscreen(options) {
        var _a, _b, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isVideoView) {
            throw Error('Cannot enter fullscreen on an audio player view.');
          }
          if (this.fullscreenController.isSupported) {
            return this.fullscreenController.requestFullscreen();
          }
          const adapter = yield this.adapter;
          const canProviderSetFullscreen = (_b = (yield ((_a = adapter === null || adapter === void 0 ? void 0 : adapter.canSetFullscreen) === null || _a === void 0 ? void 0 : _a.call(adapter)))) !== null && _b !== void 0 ? _b : false;
          if (canProviderSetFullscreen) {
            return (_c = adapter === null || adapter === void 0 ? void 0 : adapter.enterFullscreen) === null || _c === void 0 ? void 0 : _c.call(adapter, options);
          }
          throw Error('Fullscreen API is not available.');
        });
      }
      /** @inheritDoc */
      exitFullscreen() {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (this.fullscreenController.isSupported) {
            return this.fullscreenController.exitFullscreen();
          }
          return (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.exitFullscreen) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }
      /** @inheritDoc */
      canSetPiP() {
        var _a, _b, _c;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_c = (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.canSetPiP) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
        });
      }
      /** @inheritDoc */
      enterPiP() {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isVideoView)
            throw Error('Cannot enter PiP mode on an audio player view.');
          if (!(yield this.canSetPiP()))
            throw Error('Picture-in-Picture API is not available.');
          return (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.enterPiP) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }
      /** @inheritDoc */
      exitPiP() {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          return (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.exitPiP) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }
      /** @inheritDoc */
      canSetAudioTrack() {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setCurrentAudioTrack);
        });
      }
      /** @inheritDoc */
      setCurrentAudioTrack(trackId) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setCurrentAudioTrack) === null || _b === void 0 ? void 0 : _b.call(_a, trackId);
        });
      }
      /** @inheritDoc */
      canSetTextTrack() {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setCurrentTextTrack);
        });
      }
      /** @inheritDoc */
      setCurrentTextTrack(trackId) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setCurrentTextTrack) === null || _b === void 0 ? void 0 : _b.call(_a, trackId);
        });
      }
      /** @inheritDoc */
      canSetTextTrackVisibility() {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          return !isUndefined((_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setTextTrackVisibility);
        });
      }
      /** @inheritDoc */
      setTextTrackVisibility(isVisible) {
        var _a, _b;
        return __awaiter$8(this, void 0, void 0, function* () {
          (_b = (_a = (yield this.adapter)) === null || _a === void 0 ? void 0 : _a.setTextTrackVisibility) === null || _b === void 0 ? void 0 : _b.call(_a, isVisible);
        });
      }
      /** @inheritDoc */
      extendLanguage(language, translation) {
        var _a;
        return __awaiter$8(this, void 0, void 0, function* () {
          const translations = Object.assign(Object.assign({}, this.translations), { [language]: Object.assign(Object.assign({}, ((_a = this.translations[language]) !== null && _a !== void 0 ? _a : {})), translation) });
          this.translations = translations;
        });
      }
      connectedCallback() {
        this.onPausedChange();
        this.onCurrentTimeChange();
        this.onVolumeChange();
        this.onMutedChange();
        this.onDebugChange();
        this.onContainerChange();
        this.onTranslationsChange();
        this.onLanguageChange(this.language, initialState.language);
        this.disposal.add(onMobileChange(isMobile => {
          this.isMobile = isMobile;
        }));
        this.disposal.add(onTouchInputChange(isTouch => {
          this.isTouch = isTouch;
        }));
      }
      componentWillLoad() {
        Universe.create(this, this.getPlayerState());
      }
      disconnectedCallback() {
        var _a;
        (_a = this.fullscreenController) === null || _a === void 0 ? void 0 : _a.destroy();
        this.disposal.empty();
      }
      rotateDevice() {
        return __awaiter$8(this, void 0, void 0, function* () {
          if (!this.isMobile || !canRotateScreen())
            return;
          try {
            if (this.isFullscreenActive) {
              yield window.screen.orientation.lock('landscape');
            }
            else {
              yield window.screen.orientation.unlock();
            }
          }
          catch (err) {
            this.vmError.emit(err);
          }
        });
      }
      getPlayerState() {
        const state = {};
        const props = Object.keys(initialState);
        for (let i = 0; i < props.length; i += 1) {
          state[props[i]] = this[props[i]];
        }
        return state;
      }
      calcAspectRatio() {
        const [width, height] = /\d{1,2}:\d{1,2}/.test(this.aspectRatio)
          ? this.aspectRatio.split(':')
          : [16, 9];
        return (100 / Number(width)) * Number(height);
      }
      /**
       * Returns the inner container.
       */
      getContainer() {
        return __awaiter$8(this, void 0, void 0, function* () {
          return this.container;
        });
      }
      /** @internal Exposed for E2E testing. */
      callAdapter(method, value) {
        return __awaiter$8(this, void 0, void 0, function* () {
          return (yield this.adapter)[method](value);
        });
      }
      hasCustomControls() {
        return isComponentRegistered(this, 'vm-controls');
      }
      genId() {
        var _a;
        const id = (_a = this.host) === null || _a === void 0 ? void 0 : _a.id;
        if (isString(id) && id.length > 0)
          return id;
        idCount$3 += 1;
        return `vm-player-${idCount$3}`;
      }
      render() {
        const label = `${this.isAudioView ? 'Audio Player' : 'Video Player'}` +
          `${!isUndefined(this.mediaTitle) ? ` - ${this.mediaTitle}` : ''}`;
        const canShowCustomUI = !IS_IOS ||
          !this.isVideoView ||
          (this.playsinline && !this.isFullscreenActive);
        if (!canShowCustomUI) {
          this.controls = true;
        }
        const isIdle = canShowCustomUI &&
          this.hasCustomControls() &&
          this.isVideoView &&
          !this.paused &&
          !this.isControlsActive;
        const isBlockerVisible = !this.controls && canShowCustomUI && this.isVideoView;
        return (h(Host, { id: this.genId(), idle: isIdle, mobile: this.isMobile, touch: this.isTouch, live: this.isLive, audio: this.isAudioView, video: this.isVideoView, pip: this.isPiPActive, fullscreen: this.isFullscreenActive }, h("div", { "aria-label": label, "aria-hidden": !this.ready ? 'true' : 'false', "aria-busy": !this.playbackReady ? 'true' : 'false', class: {
            player: true,
            idle: isIdle,
            audio: this.isAudioView,
            video: this.isVideoView,
            fullscreen: this.isFullscreenActive,
          }, style: {
            paddingBottom: this.isVideoView
              ? `${this.calcAspectRatio()}%`
              : undefined,
          }, ref: el => {
            writeTask(() => {
              this.container = el;
            });
          } }, isBlockerVisible && h("div", { class: "blocker" }), h(Universe.Provider, { state: this.getPlayerState() }, h("slot", null)))));
      }
      get host() { return this; }
      static get watchers() { return {
        "container": ["onContainerChange"],
        "paused": ["onPausedChange"],
        "duration": ["onDurationChange"],
        "currentTime": ["onCurrentTimeChange"],
        "playbackReady": ["onPlaybackReadyChange"],
        "muted": ["onMutedChange"],
        "playbackRate": ["onPlaybackRateChange"],
        "playbackQuality": ["onPlaybackQualityChange"],
        "debug": ["onDebugChange"],
        "volume": ["onVolumeChange"],
        "viewType": ["onViewTypeChange"],
        "isAudioView": ["onViewTypeChange"],
        "isVideoView": ["onViewTypeChange"],
        "mediaType": ["onMediaTypeChange"],
        "language": ["onLanguageChange"],
        "translations": ["onTranslationsChange"]
      }; }
      static get style() { return playerCss; }
    };

    const posterCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-poster-z-index)}.poster{width:100%;height:100%;background:#000;opacity:0;visibility:hidden;pointer-events:none;transition:var(--vm-fade-transition)}.poster.hidden{display:none}.poster.active{opacity:1;visibility:visible}img{width:100%;height:100%;pointer-events:none}";

    const Poster = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoaded = createEvent(this, "vmLoaded", 3);
        this.vmWillShow = createEvent(this, "vmWillShow", 3);
        this.vmWillHide = createEvent(this, "vmWillHide", 3);
        this.isHidden = true;
        this.isActive = false;
        this.hasLoaded = false;
        /**
         * How the poster image should be resized to fit the container (sets the `object-fit` property).
         */
        this.fit = 'cover';
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.playbackStarted = false;
        /** @internal */
        this.currentTime = 0;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'mediaTitle',
          'currentPoster',
          'playbackStarted',
          'currentTime',
          'isVideoView',
        ]);
      }
      onCurrentPosterChange() {
        var _a;
        this.hasLoaded = false;
        (_a = this.lazyLoader) === null || _a === void 0 ? void 0 : _a.onMutation();
      }
      connectedCallback() {
        this.lazyLoader = new LazyLoader(this.host, ['data-src', 'src'], el => {
          const src = el.getAttribute('data-src');
          el.removeAttribute('src');
          if (!isNull(src)) {
            el.setAttribute('src', src);
          }
        });
        this.onEnabledChange();
        this.onActiveChange();
      }
      disconnectedCallback() {
        this.lazyLoader.destroy();
      }
      onVisibilityChange() {
        !this.isHidden && this.isActive
          ? this.vmWillShow.emit()
          : this.vmWillHide.emit();
      }
      onEnabledChange() {
        this.isHidden = !this.isVideoView;
        this.onVisibilityChange();
      }
      onActiveChange() {
        this.isActive = !this.playbackStarted || this.currentTime <= 0.1;
        this.onVisibilityChange();
      }
      onPosterLoad() {
        this.vmLoaded.emit();
        this.hasLoaded = true;
      }
      render() {
        return (h("div", { class: {
            poster: true,
            hidden: this.isHidden,
            active: this.isActive && this.hasLoaded,
          } }, h("img", { class: "lazy", "data-src": this.currentPoster, alt: !isUndefined(this.mediaTitle)
            ? `${this.mediaTitle} Poster`
            : 'Media Poster', style: { objectFit: this.fit }, onLoad: this.onPosterLoad.bind(this) })));
      }
      get host() { return this; }
      static get watchers() { return {
        "currentPoster": ["onCurrentPosterChange"],
        "isVideoView": ["onEnabledChange"],
        "currentTime": ["onActiveChange"],
        "playbackStarted": ["onActiveChange"]
      }; }
      static get style() { return posterCss; }
    };

    const scrimCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-scrim-z-index)}.scrim{position:absolute;width:100%;background:var(--vm-scrim-bg);display:inline-block;opacity:0;visibility:hidden;transition:var(--vm-fade-transition)}.scrim.gradient{height:258px;background:none;background-position:bottom;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAECCAYAAAA/9r2TAAABKklEQVQ4T2XI50cFABiF8dvee++67b33uM17b1MkkSSSSBJJJIkkkkQSSSKJ9Efmeb8cr86HH88JBP4thkfEkiKOFPGkSCCNRE8SKZJJkUIaqZ40UqSTIoMUmaSR5ckmRQ4pckkjz5NPigJSFJKiiDSKPSWkKCVFGWmUeypIUUmKKlJUk0aNJ0iKWlLUkUa9p4EUjaRoIkUzabR4WknRRop20ujwdJKiixTdpOghjV5PHyn6STFAGoOeIVIMk2KEFKOkMeYZJ8UEKUKkMemZIsU0KWZIMUsac54wKSKkiJLGvGeBFIukWCLFMrkCq7AG67ABm7AF27ADu7AH+3AAh3AEx3ACp3AG53ABl3AF13ADt3AH9/AAj/AEz/ACr/AG7/ABn/AF3/ADv39LujSyJPVJ0QAAAABJRU5ErkJggg==')}.scrim.gradientUp{top:unset;bottom:0}.scrim.gradientDown{transform:rotate(180deg)}.scrim.hidden{display:none}.scrim.active{opacity:1;visibility:visible}";

    const Scrim = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.isControlsActive = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isVideoView', 'isControlsActive']);
      }
      render() {
        return (h("div", { class: {
            scrim: true,
            gradient: !isUndefined(this.gradient),
            gradientUp: this.gradient === 'up',
            gradientDown: this.gradient === 'down',
            hidden: !this.isVideoView,
            active: this.isControlsActive,
          } }));
      }
      static get style() { return scrimCss; }
    };

    const getHours = (value) => Math.trunc((value / 60 / 60) % 60);
    const getMinutes = (value) => Math.trunc((value / 60) % 60);
    const getSeconds = (value) => Math.trunc(value % 60);
    const formatTime = (seconds = 0, alwaysShowHours = false) => {
      // Format time component to add leading zero.
      const format = (value) => `0${value}`.slice(-2);
      const hours = getHours(seconds);
      const mins = getMinutes(seconds);
      const secs = getSeconds(seconds);
      return `${alwaysShowHours || hours > 0 ? `${hours}:` : ''}${format(mins)}:${format(secs)}`;
    };

    const scrubberControlCss = ":host{--vm-tooltip-spacing:var(--vm-scrubber-tooltip-spacing);flex:1;position:relative;cursor:pointer;pointer-events:auto;box-sizing:border-box;left:calc(var(--vm-slider-thumb-width) / 2);margin-right:var(--vm-slider-thumb-width);margin-bottom:var(--vm-slider-track-height)}@keyframes progress{to{background-position:var(--vm-scrubber-loading-stripe-size) 0}}.scrubber{position:relative;width:100%}vm-slider,progress{margin-left:calc(calc(var(--vm-slider-thumb-width) / 2) * -1);margin-right:calc(calc(var(--vm-slider-thumb-width) / 2) * -1);width:calc(100% + var(--vm-slider-thumb-width));height:var(--vm-slider-track-height)}vm-slider:hover,progress:hover{cursor:pointer}vm-slider{position:absolute;top:0;left:0;z-index:3}progress{-webkit-appearance:none;background:transparent;border:0;border-radius:100px;position:absolute;left:0;top:50%;padding:0;color:var(--vm-scrubber-buffered-bg);height:var(--vm-slider-track-height)}progress::-webkit-progress-bar{background:transparent}progress::-webkit-progress-value{background:currentColor;border-radius:100px;min-width:var(--vm-slider-track-height);transition:width 0.2s ease}progress::-moz-progress-bar{background:currentColor;border-radius:100px;min-width:var(--vm-slider-track-height);transition:width 0.2s ease}progress::-ms-fill{border-radius:100px;transition:width 0.2s ease}progress.loading{animation:progress 1s linear infinite;background-image:linear-gradient(\n    -45deg,\n    var(--vm-scrubber-loading-stripe-color) 25%,\n    transparent 25%,\n    transparent 50%,\n    var(--vm-scrubber-loading-stripe-color) 50%,\n    var(--vm-scrubber-loading-stripe-color) 75%,\n    transparent 75%,\n    transparent\n  );background-repeat:repeat-x;background-size:var(--vm-scrubber-loading-stripe-size)\n    var(--vm-scrubber-loading-stripe-size);color:transparent;background-color:transparent}";

    var __awaiter$7 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const ScrubberControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.keyboardDisposal = new Disposal();
        this.timestamp = '';
        this.endTime = 0;
        /**
         * Whether the timestamp in the tooltip should show the hours unit, even if the time is less than
         * 1 hour (eg: `20:35` -> `00:20:35`).
         */
        this.alwaysShowHours = false;
        /**
         * Whether the tooltip should not be displayed.
         */
        this.hideTooltip = false;
        /** @internal */
        this.currentTime = 0;
        /** @internal */
        this.duration = -1;
        /**
         * Prevents seeking forward/backward by using the Left/Right arrow keys.
         */
        this.noKeyboard = false;
        /** @internal */
        this.buffering = false;
        /** @internal */
        this.buffered = 0;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, [
          'i18n',
          'currentTime',
          'duration',
          'buffering',
          'buffered',
        ]);
      }
      onNoKeyboardChange() {
        return __awaiter$7(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (this.noKeyboard)
            return;
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          const onKeyDown = (event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
              return;
            event.preventDefault();
            const isLeftArrow = event.key === 'ArrowLeft';
            const seekTo = isLeftArrow
              ? Math.max(0, this.currentTime - 5)
              : Math.min(this.duration, this.currentTime + 5);
            this.dispatch('currentTime', seekTo);
          };
          this.keyboardDisposal.add(listen(player, 'keydown', onKeyDown));
        });
      }
      onDurationChange() {
        // Avoid -1.
        this.endTime = Math.max(0, this.duration);
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        this.timestamp = formatTime(this.currentTime, this.alwaysShowHours);
        this.onNoKeyboardChange();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      setTooltipPosition(value) {
        var _a, _b;
        const tooltipRect = (_b = (_a = this.tooltip.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.tooltip')) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
        const bounds = this.slider.getBoundingClientRect();
        const thumbWidth = parseFloat(window
          .getComputedStyle(this.slider)
          .getPropertyValue('--vm-slider-thumb-width'));
        const leftLimit = tooltipRect.width / 2 - thumbWidth / 2;
        const rightLimit = bounds.width - tooltipRect.width / 2 - thumbWidth / 2;
        const xPos = Math.max(leftLimit, Math.min(value, rightLimit));
        this.tooltip.style = `--vm-tooltip-left: ${xPos}px`;
      }
      onSeek(event) {
        this.dispatch('currentTime', event.detail);
      }
      onSeeking(event) {
        if (this.duration < 0 || this.tooltip.hidden)
          return;
        if (event.type === 'mouseleave') {
          this.getSliderInput().blur();
          this.tooltip.active = false;
          return;
        }
        const rect = this.host.getBoundingClientRect();
        const percent = Math.max(0, Math.min(100, (100 / rect.width) * (event.pageX - rect.left)));
        this.timestamp = formatTime((this.duration / 100) * percent, this.alwaysShowHours);
        this.setTooltipPosition((percent / 100) * rect.width);
        if (!this.tooltip.active) {
          this.getSliderInput().focus();
          this.tooltip.active = true;
        }
      }
      getSliderInput() {
        var _a;
        return (_a = this.slider.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input');
      }
      render() {
        const sliderValueText = this.i18n.scrubberLabel
          .replace(/{currentTime}/, formatTime(this.currentTime))
          .replace(/{duration}/, formatTime(this.endTime));
        return (h("div", { class: "scrubber", onMouseEnter: this.onSeeking.bind(this), onMouseLeave: this.onSeeking.bind(this), onMouseMove: this.onSeeking.bind(this), onTouchMove: () => {
            this.getSliderInput().focus();
          }, onTouchEnd: () => {
            this.getSliderInput().blur();
          } }, h("vm-slider", { step: 0.01, max: this.endTime, value: this.currentTime, label: this.i18n.scrubber, valueText: sliderValueText, onVmValueChange: this.onSeek.bind(this), ref: (el) => {
            this.slider = el;
          } }), h("progress", { class: {
            loading: this.buffering,
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          min: 0, max: this.endTime, value: this.buffered, "aria-label": this.i18n.buffered, "aria-valuemin": "0", "aria-valuemax": this.endTime, "aria-valuenow": this.buffered, "aria-valuetext": `${(this.endTime > 0
        ? this.buffered / this.endTime
        : 0).toFixed(0)}%` }, "% buffered"), h("vm-tooltip", { hidden: this.hideTooltip, ref: (el) => {
            this.tooltip = el;
          } }, this.timestamp)));
      }
      get host() { return this; }
      static get watchers() { return {
        "noKeyboard": ["onNoKeyboardChange"],
        "duration": ["onDurationChange"]
      }; }
      static get style() { return scrubberControlCss; }
    };

    const settingsCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-menu-z-index)}.settings{position:absolute;opacity:0;pointer-events:none;overflow-x:hidden;overflow-y:auto;background-color:var(--vm-menu-bg);max-height:var(--vm-settings-max-height);border-radius:var(--vm-settings-border-radius);padding:var(--vm-settings-padding);box-shadow:var(--vm-settings-shadow);box-sizing:border-box;scrollbar-width:thin;scroll-behavior:smooth;scrollbar-color:var(--vm-settings-scroll-thumb-color)\n    var(--vm-settings-scroll-track-color);transform:translateY(8px);transition:var(--vm-settings-transition)}.container{display:block;width:var(--vm-settings-width);height:100%;position:relative;transition:width 0.25s ease-in, height 0.25s ease-in}.settings.hydrated{visibility:hidden !important}.settings::-webkit-scrollbar{width:var(--vm-settings-scroll-width)}.settings::-webkit-scrollbar-track{background:var(--vm-settings-scroll-track-color)}.settings::-webkit-scrollbar-thumb{border-radius:var(--vm-settings-scroll-width);background-color:var(--vm-settings-scroll-thumb-color);border:2px solid var(--vm-menu-bg)}.settings.active{transform:translateY(0);opacity:1;pointer-events:auto;visibility:visible !important}.settings.mobile{position:fixed;top:auto !important;left:0 !important;right:0 !important;bottom:0 !important;width:100%;min-height:56px;max-height:50%;border-radius:0;z-index:2147483647;transform:translateY(100%)}.settings.mobile.active{transform:translateY(0)}.settings.mobile>vm-menu{height:100% !important;overflow:auto !important}";

    var __awaiter$6 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let idCount$2 = 0;
    const Settings = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.disposal = new Disposal();
        this.menuHeight = 0;
        /**
         * Pins the settings to the defined position inside the video player. This has no effect when
         * the view is of type `audio` (always `bottomRight`) and on mobile devices (always bottom sheet).
         */
        this.pin = 'bottomRight';
        /**
         * Whether the settings menu is opened/closed.
         */
        this.active = false;
        /** @internal */
        this.isMobile = false;
        /** @internal */
        this.isAudioView = false;
        withComponentRegistry(this);
        withControlsCollisionDetection(this);
        withPlayerContext(this, ['isMobile', 'isAudioView']);
      }
      onActiveChange() {
        this.dispatch('isSettingsActive', this.active);
        if (isUndefined(this.controller))
          return;
        this.controller.expanded = this.active;
      }
      connectedCallback() {
        this.dispatch = createDispatcher(this);
        idCount$2 += 1;
        this.id = `vm-settings-${idCount$2}`;
      }
      disconnectedCallback() {
        this.disposal.empty();
      }
      /**
       * Sets the controller responsible for opening/closing this settings menu.
       */
      setController(controller) {
        return __awaiter$6(this, void 0, void 0, function* () {
          this.controller = controller;
          this.controller.menu = this.id;
          this.disposal.empty();
          this.disposal.add(listen(this.controller, 'click', () => {
            this.active = !this.active;
          }));
          this.disposal.add(listen(this.controller, 'keydown', (event) => {
            if (event.key !== 'Enter')
              return;
            // We're looking for !active because the `click` event above will toggle it to active.
            if (!this.active)
              this.menu.focusMenu();
          }));
        });
      }
      getPosition() {
        if (this.isAudioView) {
          return {
            right: '0',
            bottom: 'calc(var(--vm-controls-height, 0) + 4px)',
          };
        }
        // topLeft => { top: 0, left: 0 }
        const pos = this.pin.split(/(?=[L|R])/).map(s => s.toLowerCase());
        return {
          [pos.includes('top') ? 'top' : 'bottom']: 'var(--vm-controls-height, 0)',
          [pos.includes('left') ? 'left' : 'right']: '8px',
        };
      }
      onOpen(event) {
        var _a;
        if (((_a = event.detail) === null || _a === void 0 ? void 0 : _a.identifier) !== this.id)
          return;
        this.active = true;
      }
      onClose(event) {
        var _a;
        if (((_a = event.detail) === null || _a === void 0 ? void 0 : _a.identifier) !== this.id)
          return;
        this.active = false;
      }
      onHeightChange(event) {
        this.menuHeight = event.detail;
      }
      render() {
        return (h("div", { style: Object.assign({}, this.getPosition()), class: {
            settings: true,
            active: this.active,
            mobile: this.isMobile,
          } }, h("div", { class: "container", style: { height: `${this.menuHeight}px` } }, h("vm-menu", { identifier: this.id, active: this.active, controller: this.controller, onVmOpen: this.onOpen.bind(this), onVmClose: this.onClose.bind(this), onVmMenuHeightChange: this.onHeightChange.bind(this), ref: (el) => {
            this.menu = el;
          } }, h("slot", null)))));
      }
      get host() { return this; }
      static get watchers() { return {
        "active": ["onActiveChange"]
      }; }
      static get style() { return settingsCss; }
    };

    const settingsControlCss = ".settingsControl.hidden{display:none}.settingsControl{--vm-icon-transition:transform 0.3s ease}.settingsControl.active{--vm-icon-transform:rotate(90deg)}";

    var __awaiter$5 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let idCount$1 = 0;
    const SettingsControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * The name of the settings icon to resolve from the icon library.
         */
        this.icon = 'settings';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the settings menu this control manages is open.
         */
        this.expanded = false;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ['i18n']);
      }
      onComponentsChange() {
        if (!isUndefined(this.vmSettings)) {
          this.vmSettings.setController(this.host);
        }
      }
      connectedCallback() {
        idCount$1 += 1;
        this.id = `vm-settings-control-${idCount$1}`;
        watchComponentRegistry(this, 'vm-settings', regs => {
          [this.vmSettings] = regs;
        });
      }
      /**
       * Focuses the control.
       */
      focusControl() {
        var _a;
        return __awaiter$5(this, void 0, void 0, function* () {
          (_a = this.control) === null || _a === void 0 ? void 0 : _a.focusControl();
        });
      }
      /**
       * Removes focus from the control.
       */
      blurControl() {
        var _a;
        return __awaiter$5(this, void 0, void 0, function* () {
          (_a = this.control) === null || _a === void 0 ? void 0 : _a.blurControl();
        });
      }
      render() {
        const hasSettings = !isUndefined(this.menu);
        return (h("div", { class: {
            settingsControl: true,
            hidden: !hasSettings,
            active: hasSettings && this.expanded,
          } }, h("vm-control", { identifier: this.id, menu: this.menu, hidden: !hasSettings, expanded: this.expanded, label: this.i18n.settings, ref: control => {
            this.control = control;
          } }, h("vm-icon", { name: this.icon, library: this.icons }), h("vm-tooltip", { hidden: this.expanded, position: this.tooltipPosition, direction: this.tooltipDirection }, this.i18n.settings))));
      }
      get host() { return this; }
      static get watchers() { return {
        "vmSettings": ["onComponentsChange"]
      }; }
      static get style() { return settingsControlCss; }
    };

    const skeletonCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-skeleton-z-index)}@keyframes sheen{0%{background-position:200% 0}to{background-position:-200% 0}}.skeleton{width:100%;height:100%;display:flex;min-height:1rem;pointer-events:auto}.sheen.hidden{opacity:0;visibility:hidden;transition:var(--vm-fade-transition);pointer-events:none}.indicator{flex:1 1 auto;background:var(--vm-skeleton-color)}.skeleton.sheen .indicator{background:linear-gradient(\n    270deg,\n    var(--vm-skeleton-sheen-color),\n    var(--vm-skeleton-color),\n    var(--vm-skeleton-color),\n    var(--vm-skeleton-sheen-color)\n  );background-size:400% 100%;background-size:400% 100%;animation:sheen 8s ease-in-out infinite}";

    const Skeleton = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.hidden = false;
        /**
         * Determines which animation effect the skeleton will use.
         * */
        this.effect = 'sheen';
        /** @internal */
        this.ready = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['ready']);
      }
      onReadyChange() {
        if (!this.ready) {
          this.hidden = false;
        }
        else {
          setTimeout(() => {
            this.hidden = true;
          }, 500);
        }
      }
      render() {
        return (h("div", { class: {
            skeleton: true,
            hidden: this.hidden,
            sheen: this.effect === 'sheen',
          } }, h("div", { class: "indicator" })));
      }
      static get watchers() { return {
        "ready": ["onReadyChange"]
      }; }
      static get style() { return skeletonCss; }
    };

    const sliderCss = ":host{width:100%}.slider{width:100%}input{width:100%;-webkit-appearance:none;background:transparent;border:0;outline:0;cursor:pointer;box-sizing:border-box;border-radius:calc(var(--vm-slider-thumb-height) * 2);user-select:none;-webkit-user-select:none;touch-action:manipulation;color:var(--vm-slider-value-color);display:block;height:var(--vm-slider-track-height);margin:0;padding:0;transition:box-shadow 0.3s ease}input::-webkit-slider-runnable-track{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background-image:linear-gradient(\n    to right,\n    currentColor var(--vm-value, 0%),\n    transparent var(--vm-value, 0%)\n  );background-color:var(--vm-slider-track-color)}input::-webkit-slider-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow);-webkit-appearance:none;margin-top:calc(\n    0px -\n      calc(\n        calc(var(--vm-slider-thumb-height) - var(--vm-slider-track-height)) / 2\n      )\n  )}input::-moz-range-track{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background-color:var(--vm-slider-track-color)}input::-moz-range-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow)}input::-moz-range-progress{background:currentColor;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height)}input::-ms-track{border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;color:transparent;background-color:var(--vm-slider-track-color)}input::-ms-fill-upper{background:transparent;border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none}input::-ms-fill-lower{border:0;border-radius:calc(var(--vm-slider-track-height) / 2);height:var(--vm-slider-track-height);transition:box-shadow 0.3s ease;user-select:none;background:currentColor}input::-ms-thumb{opacity:0;background:var(--vm-slider-thumb-bg);border:0;border-radius:100%;position:relative;transition:all 0.2s ease;width:var(--vm-slider-thumb-width);height:var(--vm-slider-thumb-height);box-shadow:var(--vm-slider-thumb-shadow);margin-top:0}input::-ms-tooltip{display:none}input:hover::-webkit-slider-runnable-track{height:var(--vm-slider-track-focused-height)}input:hover::-moz-range-track{height:var(--vm-slider-track-focused-height)}input:hover::-ms-track{height:var(--vm-slider-track-focused-height)}input:hover::-ms-fill-upper{height:var(--vm-slider-track-focused-height)}input:hover::-ms-fill-lower{height:var(--vm-slider-track-focused-height)}input:hover::-webkit-slider-thumb{opacity:1}input:hover::-moz-range-thumb{opacity:1}input:hover::-ms-thumb{opacity:1}input:focus{outline:0}input:focus::-webkit-slider-runnable-track{outline:0;height:var(--vm-slider-track-focused-height)}input:focus::-moz-range-track{outline:0;height:var(--vm-slider-track-focused-height)}input:focus::-ms-track{outline:0;height:var(--vm-slider-track-focused-height)}input::-moz-focus-outer{border:0}";

    const Slider = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmValueChange = createEvent(this, "vmValueChange", 7);
        this.vmFocus = createEvent(this, "vmFocus", 7);
        this.vmBlur = createEvent(this, "vmBlur", 7);
        /**
         * A number that specifies the granularity that the value must adhere to.
         */
        this.step = 1;
        /**
         * The lowest value in the range of permitted values.
         */
        this.min = 0;
        /**
         * The greatest permitted value.
         */
        this.max = 10;
        /**
         * The current value.
         */
        this.value = 5;
        withComponentRegistry(this);
      }
      getPercentage() {
        return `${(this.value / this.max) * 100}%`;
      }
      onValueChange(event) {
        var _a;
        const value = parseFloat((_a = event.target) === null || _a === void 0 ? void 0 : _a.value);
        this.vmValueChange.emit(value);
      }
      calcTouchedValue(event) {
        const input = event.target;
        const touch = event.changedTouches[0];
        const min = parseFloat(input.getAttribute('min'));
        const max = parseFloat(input.getAttribute('max'));
        const step = parseFloat(input.getAttribute('step'));
        const delta = max - min;
        // Calculate percentage.
        let percent;
        const clientRect = input.getBoundingClientRect();
        const sliderThumbWidth = parseFloat(window
          .getComputedStyle(this.host)
          .getPropertyValue('--vm-slider-thumb-width'));
        const thumbWidth = ((100 / clientRect.width) * (sliderThumbWidth / 2)) / 100;
        percent = (100 / clientRect.width) * (touch.clientX - clientRect.left);
        // Don't allow outside bounds.
        percent = Math.max(0, Math.min(percent, 100));
        // Factor in the thumb offset.
        if (percent < 50) {
          percent -= (100 - percent * 2) * thumbWidth;
        }
        else if (percent > 50) {
          percent += (percent - 50) * 2 * thumbWidth;
        }
        const position = delta * (percent / 100);
        if (step >= 1) {
          return min + Math.round(position / step) * step;
        }
        /**
         * This part differs from original implementation to save space. Only supports 2 decimal
         * places (0.01) as the step.
         */
        return min + parseFloat(position.toFixed(2));
      }
      /**
       * Basically input[range="type"] on touch devices sucks (particularly iOS), so this helps make it
       * better.
       *
       * @see https://github.com/sampotts/rangetouch
       */
      onTouch(event) {
        const input = event.target;
        if (input.disabled)
          return;
        event.preventDefault();
        this.value = this.calcTouchedValue(event);
        this.vmValueChange.emit(this.value);
        input.dispatchEvent(new window.Event(event.type === 'touchend' ? 'change' : 'input', {
          bubbles: true,
        }));
      }
      render() {
        var _a;
        return (h("div", { class: "slider", style: {
            '--vm-value': this.getPercentage(),
          } }, h("input", { type: "range", step: this.step, min: this.min, max: this.max, value: this.value, autocomplete: "off", "aria-label": this.label, "aria-valuemin": this.min, "aria-valuemax": this.max, "aria-valuenow": this.value, "aria-valuetext": (_a = this.valueText) !== null && _a !== void 0 ? _a : this.getPercentage(), "aria-orientation": "horizontal", onInput: this.onValueChange.bind(this), onFocus: () => {
            this.vmFocus.emit();
          }, onBlur: () => {
            this.vmBlur.emit();
          }, onTouchStart: this.onTouch.bind(this), onTouchMove: this.onTouch.bind(this), onTouchEnd: this.onTouch.bind(this) })));
      }
      get host() { return this; }
      static get style() { return sliderCss; }
    };

    const spinnerCss = ":host{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:var(--vm-spinner-z-index)}.spinner{width:100%;height:100%;display:flex;justify-content:center;align-items:center;opacity:0;visibility:hidden;pointer-events:none;transition:var(--vm-fade-transition)}.spinner.hidden{display:none}.spinner.active{opacity:1;visibility:visible}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.spin{background:transparent;margin:60px auto;font-size:10px;position:relative;text-indent:-9999em;pointer-events:none;border-top:var(--vm-spinner-thickness) solid var(--vm-spinner-fill-color);border-left:var(--vm-spinner-thickness) solid var(--vm-spinner-fill-color);border-right:var(--vm-spinner-thickness) solid var(--vm-spinner-track-color);border-bottom:var(--vm-spinner-thickness) solid var(--vm-spinner-track-color);transform:translateZ(0)}.spin.active{animation:spin var(--vm-spinner-spin-duration) infinite\n    var(--vm-spinner-spin-timing-func)}.spin,.spin::after{border-radius:50%;width:var(--vm-spinner-width);height:var(--vm-spinner-height)}";

    const Spinner = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmWillShow = createEvent(this, "vmWillShow", 3);
        this.vmWillHide = createEvent(this, "vmWillHide", 3);
        this.blacklist = [Provider.YouTube];
        this.isHidden = true;
        this.isActive = false;
        /** @internal */
        this.isVideoView = false;
        /**
         * Whether the spinner should be active when the player is booting or media is loading.
         */
        this.showWhenMediaLoading = false;
        /** @internal */
        this.playbackReady = false;
        /** @internal */
        this.buffering = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'isVideoView',
          'buffering',
          'playbackReady',
          'currentProvider',
        ]);
      }
      onVideoViewChange() {
        this.isHidden = !this.isVideoView;
        this.onVisiblityChange();
      }
      onActiveChange() {
        this.isActive =
          this.buffering || (this.showWhenMediaLoading && !this.playbackReady);
        this.onVisiblityChange();
      }
      onVisiblityChange() {
        !this.isHidden && this.isActive
          ? this.vmWillShow.emit()
          : this.vmWillHide.emit();
      }
      render() {
        return (h("div", { class: {
            spinner: true,
            hidden: this.isHidden || this.blacklist.includes(this.currentProvider),
            active: this.isActive,
          } }, h("div", { class: {
            spin: true,
            active: this.isActive,
          } }, "Loading...")));
      }
      static get watchers() { return {
        "isVideoView": ["onVideoViewChange"],
        "buffering": ["onActiveChange"],
        "playbackReady": ["onActiveChange"]
      }; }
      static get style() { return spinnerCss; }
    };

    var __awaiter$4 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    let idCount = 0;
    const Submenu = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmOpenSubmenu = createEvent(this, "vmOpenSubmenu", 7);
        this.vmCloseSubmenu = createEvent(this, "vmCloseSubmenu", 7);
        /**
         * The direction the submenu should slide in from.
         */
        this.slideInDirection = 'right';
        /**
         * Whether the submenu is open/closed.
         */
        this.active = false;
        withComponentRegistry(this);
      }
      connectedCallback() {
        this.genId();
      }
      /**
       * Returns the controller (`vm-menu-item`) for this submenu.
       */
      getController() {
        return __awaiter$4(this, void 0, void 0, function* () {
          return this.controller;
        });
      }
      /**
       * Returns the menu (`vm-menu`) for this submenu.
       */
      getMenu() {
        return __awaiter$4(this, void 0, void 0, function* () {
          return this.menu;
        });
      }
      /**
       * Returns the height of the submenu controller.
       */
      getControllerHeight() {
        var _a, _b;
        return __awaiter$4(this, void 0, void 0, function* () {
          return (_b = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.getHeight()) !== null && _b !== void 0 ? _b : 0;
        });
      }
      getControllerHeightSync() {
        var _a;
        const el = (_a = this.controller) === null || _a === void 0 ? void 0 : _a.shadowRoot.querySelector("[role='menuitem']");
        return el ? parseFloat(window.getComputedStyle(el).height) : 0;
      }
      onMenuOpen() {
        this.active = true;
        this.vmOpenSubmenu.emit(this.host);
      }
      onMenuClose() {
        this.active = false;
        this.vmCloseSubmenu.emit(this.host);
      }
      genId() {
        idCount += 1;
        this.id = `vm-submenu-${idCount}`;
      }
      getControllerId() {
        return `${this.id}-controller`;
      }
      render() {
        return (h("div", null, h("vm-menu-item", { identifier: this.getControllerId(), menu: this.menu, label: this.label, hint: this.hint, expanded: this.active, ref: el => {
            writeTask(() => {
              this.controller = el;
            });
          } }), h("vm-menu", { identifier: this.id, controller: this.controller, active: this.active, slideInDirection: this.slideInDirection, onVmOpen: this.onMenuOpen.bind(this), onVmClose: this.onMenuClose.bind(this), ref: el => {
            writeTask(() => {
              this.menu = el;
            });
          }, style: { top: `${this.getControllerHeightSync() + 1}px` } }, h("slot", null))));
      }
      get host() { return this; }
    };

    const timeCss = ".time{display:flex;align-items:center;color:var(--vm-time-color);font-size:var(--vm-time-font-size);font-weight:var(--vm-time-font-weight)}";

    const Time = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * The length of time in seconds.
         */
        this.seconds = 0;
        /**
         * Whether the time should always show the hours unit, even if the time is less than
         * 1 hour (eg: `20:35` -> `00:20:35`).
         */
        this.alwaysShowHours = false;
        withComponentRegistry(this);
      }
      render() {
        return (h("div", { class: "time", "aria-label": this.label }, formatTime(Math.max(0, this.seconds), this.alwaysShowHours)));
      }
      static get style() { return timeCss; }
    };

    const timeProgressCss = ".timeProgress{display:flex;width:100%;height:100%;align-items:center;color:var(--vm-time-color)}.separator{margin:0 4px}";

    const TimeProgress = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /**
         * The string used to separate the current time and end time.
         */
        this.separator = '/';
        /**
         * Whether the times should always show the hours unit, even if the time is less than
         * 1 hour (eg: `20:35` -> `00:20:35`).
         */
        this.alwaysShowHours = false;
        withComponentRegistry(this);
      }
      render() {
        return (h("div", { class: "timeProgress" }, h("vm-current-time", { alwaysShowHours: this.alwaysShowHours }), h("span", { class: "separator" }, this.separator), h("vm-end-time", { alwaysShowHours: this.alwaysShowHours })));
      }
      static get style() { return timeProgressCss; }
    };

    const tooltipCss = ":host{display:contents;z-index:var(--vm-tooltip-z-index)}.tooltip{left:var(--vm-tooltip-left, 50%);transform:translateX(-50%);line-height:1.3;pointer-events:none;position:absolute;opacity:0;white-space:nowrap;visibility:hidden;background:var(--vm-tooltip-bg);border-radius:var(--vm-tooltip-border-radius);box-sizing:border-box;box-shadow:var(--vm-tooltip-box-shadow);color:var(--vm-tooltip-color);font-size:var(--vm-tooltip-font-size);padding:var(--vm-tooltip-padding);transition:opacity var(--vm-tooltip-fade-duration)\n    var(--vm-tooltip-fade-timing-func)}.tooltip[aria-hidden='false']{opacity:1;visibility:visible}.tooltip.hidden{display:none}.tooltip.onTop{bottom:100%;margin-bottom:var(--vm-tooltip-spacing)}.tooltip.onBottom{top:100%;margin-top:var(--vm-tooltip-spacing)}.tooltip.growLeft{left:auto;right:0;transform:none}.tooltip.growRight{left:0;transform:none}";

    let tooltipIdCount = 0;
    const Tooltip = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        // Avoid tooltips flashing when player initializing.
        this.hasLoaded = false;
        /**
         * Whether the tooltip is displayed or not.
         */
        this.hidden = false;
        /**
         * Whether the tooltip is visible or not.
         */
        this.active = false;
        /**
         * Determines if the tooltip appears on top/bottom of it's parent.
         */
        this.position = 'top';
        /** @internal */
        this.isTouch = false;
        /** @internal */
        this.isMobile = false;
        withComponentRegistry(this);
        withPlayerContext(this, ['isTouch', 'isMobile']);
      }
      componentDidLoad() {
        this.hasLoaded = true;
      }
      getId() {
        // eslint-disable-next-line prefer-destructuring
        const id = this.host.id;
        if (isString(id) && id.length > 0)
          return id;
        tooltipIdCount += 1;
        return `vm-tooltip-${tooltipIdCount}`;
      }
      render() {
        return (h("div", { id: this.getId(), role: "tooltip", "aria-hidden": !this.active || this.isTouch || this.isMobile ? 'true' : 'false', class: {
            tooltip: true,
            hidden: !this.hasLoaded || this.hidden,
            onTop: this.position === 'top',
            onBottom: this.position === 'bottom',
            growLeft: this.direction === 'left',
            growRight: this.direction === 'right',
          } }, h("slot", null)));
      }
      get host() { return this; }
      static get style() { return tooltipCss; }
    };

    const uiCss = ":host{z-index:var(--vm-ui-z-index)}.ui{width:100%;pointer-events:none}.ui.hidden{display:none}.ui.video{position:absolute;top:0;left:0;height:100%}";

    const UI = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        /** @internal */
        this.isVideoView = false;
        /** @internal */
        this.playsinline = false;
        /** @internal */
        this.isFullscreenActive = false;
        withComponentRegistry(this);
        withPlayerContext(this, [
          'isVideoView',
          'playsinline',
          'isFullscreenActive',
        ]);
      }
      render() {
        const canShowCustomUI = !IS_IOS ||
          !this.isVideoView ||
          (this.playsinline && !this.isFullscreenActive);
        return (h("div", { class: {
            ui: true,
            hidden: !canShowCustomUI,
            video: this.isVideoView,
          } }, canShowCustomUI && h("slot", null)));
      }
      static get style() { return uiCss; }
    };

    var __awaiter$3 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const Video = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        /**
         * @internal Whether an external SDK will attach itself to the media player and control it.
         */
        this.willAttach = false;
        /**
         * @internal Whether an external SDK will manage the text tracks.
         */
        this.hasCustomTextManager = false;
        /** @inheritdoc */
        this.preload = 'metadata';
        withComponentRegistry(this);
        withProviderConnect(this);
      }
      onProviderConnect(event) {
        if (this.willAttach)
          event.stopImmediatePropagation();
      }
      onProviderDisconnect(event) {
        if (this.willAttach)
          event.stopImmediatePropagation();
      }
      /** @internal */
      getAdapter() {
        var _a;
        return __awaiter$3(this, void 0, void 0, function* () {
          return (_a = this.fileProvider) === null || _a === void 0 ? void 0 : _a.getAdapter();
        });
      }
      render() {
        return (h("vm-file", { noConnect: true, willAttach: this.willAttach, crossOrigin: this.crossOrigin, poster: this.poster, preload: this.preload, controlsList: this.controlsList, autoPiP: this.autoPiP, disablePiP: this.disablePiP, disableRemotePlayback: this.disableRemotePlayback, hasCustomTextManager: this.hasCustomTextManager, mediaTitle: this.mediaTitle, viewType: ViewType.Video, ref: (el) => {
            this.fileProvider = el;
          } }, h("slot", null)));
      }
    };

    /**
     * @see https://developer.vimeo.com/player/sdk/reference#events-for-playback-controls
     */
    var VimeoEvent;
    (function (VimeoEvent) {
      VimeoEvent["Play"] = "play";
      VimeoEvent["Pause"] = "pause";
      VimeoEvent["Seeking"] = "seeking";
      VimeoEvent["Seeked"] = "seeked";
      VimeoEvent["TimeUpdate"] = "timeupdate";
      VimeoEvent["VolumeChange"] = "volumechange";
      VimeoEvent["DurationChange"] = "durationchange";
      VimeoEvent["FullscreenChange"] = "fullscreenchange";
      VimeoEvent["CueChange"] = "cuechange";
      VimeoEvent["Progress"] = "progress";
      VimeoEvent["Error"] = "error";
      VimeoEvent["PlaybackRateChange"] = "playbackratechange";
      VimeoEvent["Loaded"] = "loaded";
      VimeoEvent["BufferStart"] = "bufferstart";
      VimeoEvent["BufferEnd"] = "bufferend";
      VimeoEvent["TextTrackChange"] = "texttrackchange";
      VimeoEvent["Waiting"] = "waiting";
      VimeoEvent["Ended"] = "ended";
    })(VimeoEvent || (VimeoEvent = {}));

    const vimeoCss = ":host{z-index:var(--vm-media-z-index)}vm-embed{position:absolute;top:0;left:0;width:100%;height:100%}vm-embed.hideControls{display:block;width:100%;height:auto;position:relative}";

    var __awaiter$2 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const videoInfoCache = new Map();
    const Vimeo = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.vmError = createEvent(this, "vmError", 7);
        this.defaultInternalState = {};
        this.volume = 50;
        this.hasLoaded = false;
        this.internalState = {
          paused: true,
          playing: false,
          seeking: false,
          currentTime: 0,
          buffered: 0,
          playbackStarted: false,
          playRequest: false,
        };
        this.embedSrc = '';
        this.mediaTitle = '';
        /**
         * Whether to display the video owner's name.
         */
        this.byline = true;
        /**
         * Whether to display the video owner's portrait.
         */
        this.portrait = true;
        /**
         * Turns off automatically determining the aspect ratio of the current video.
         */
        this.noAutoAspectRatio = false;
        /**
         * Whether cookies should be enabled on the embed.
         */
        this.cookies = true;
        /** @internal */
        this.language = 'en';
        /** @internal */
        this.aspectRatio = '16:9';
        /** @internal */
        this.autoplay = false;
        /** @internal */
        this.controls = false;
        /** @internal */
        this.loop = false;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        this.cancelTimeUpdates();
        if (!this.videoId) {
          this.embedSrc = '';
          return;
        }
        this.embedSrc = `${this.getOrigin()}/video/${this.videoId}`;
        this.pendingDurationCall = deferredPromise();
        this.pendingMediaTitleCall = deferredPromise();
        this.fetchVideoInfo = this.getVideoInfo();
      }
      onCustomPosterChange() {
        this.dispatch('currentPoster', this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch('viewType', ViewType.Video);
        this.onVideoIdChange();
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentDidLoad() {
        this.initialMuted = this.muted;
      }
      disconnectedCallback() {
        this.cancelTimeUpdates();
        this.pendingPlayRequest = undefined;
      }
      getOrigin() {
        return 'https://player.vimeo.com';
      }
      getPreconnections() {
        return [
          this.getOrigin(),
          'https://i.vimeocdn.com',
          'https://f.vimeocdn.com',
          'https://fresnel.vimeocdn.com',
        ];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          method: command,
          value: arg,
        });
      }
      buildParams() {
        return {
          byline: this.byline,
          color: this.color,
          portrait: this.portrait,
          autopause: false,
          transparent: false,
          autoplay: this.autoplay,
          muted: this.initialMuted,
          playsinline: this.playsinline,
          dnt: !this.cookies,
        };
      }
      getVideoInfo() {
        return __awaiter$2(this, void 0, void 0, function* () {
          if (videoInfoCache.has(this.videoId))
            return videoInfoCache.get(this.videoId);
          return window
            .fetch(`https://vimeo.com/api/oembed.json?url=${this.embedSrc}`)
            .then(response => response.json())
            .then(data => {
            var _a;
            const thumnailRegex = /vimeocdn.com\/video\/(.*)?_/;
            const thumbnailId = (_a = data === null || data === void 0 ? void 0 : data.thumbnail_url) === null || _a === void 0 ? void 0 : _a.match(thumnailRegex)[1];
            const poster = `https://i.vimeocdn.com/video/${thumbnailId}_1920x1080.jpg`;
            const info = { poster, width: data === null || data === void 0 ? void 0 : data.width, height: data === null || data === void 0 ? void 0 : data.height };
            videoInfoCache.set(this.videoId, info);
            return info;
          });
        });
      }
      onTimeChange(time) {
        if (this.internalState.currentTime === time)
          return;
        this.dispatch('currentTime', time);
        // This is how we detect `seeking` early.
        if (Math.abs(this.internalState.currentTime - time) > 1.5) {
          this.internalState.seeking = true;
          this.dispatch('seeking', true);
          if (this.internalState.playing && this.internalState.buffered < time) {
            this.dispatch('buffering', true);
          }
          // Player doesn't resume playback once seeked.
          window.clearTimeout(this.pendingPlayRequest);
          if (!this.internalState.paused) {
            this.internalState.playRequest = true;
          }
          this.remoteControl(this.internalState.playbackStarted
            ? "pause" /* Pause */
            : "play" /* Play */);
        }
        this.internalState.currentTime = time;
      }
      cancelTimeUpdates() {
        if (isNumber(this.timeRAF))
          window.cancelAnimationFrame(this.timeRAF);
      }
      requestTimeUpdates() {
        this.remoteControl("getCurrentTime" /* GetCurrentTime */);
        this.timeRAF = window.requestAnimationFrame(() => {
          this.requestTimeUpdates();
        });
      }
      onSeeked() {
        if (!this.internalState.seeking)
          return;
        this.dispatch('seeking', false);
        this.internalState.seeking = false;
        if (this.internalState.playRequest) {
          window.setTimeout(() => {
            this.remoteControl("play" /* Play */);
          }, 150);
        }
      }
      onVimeoMethod(method, arg) {
        var _a, _b;
        switch (method) {
          case "getCurrentTime" /* GetCurrentTime */:
            if (!this.internalState.seeking)
              this.onTimeChange(arg);
            break;
          case "getDuration" /* GetDuration */:
            (_a = this.pendingDurationCall) === null || _a === void 0 ? void 0 : _a.resolve(arg);
            break;
          case "getVideoTitle" /* GetVideoTitle */:
            (_b = this.pendingMediaTitleCall) === null || _b === void 0 ? void 0 : _b.resolve(arg);
            break;
        }
      }
      onLoaded() {
        var _a, _b;
        if (this.hasLoaded)
          return;
        this.pendingPlayRequest = undefined;
        this.internalState = Object.assign({}, this.defaultInternalState);
        this.dispatch('currentSrc', this.embedSrc);
        this.dispatch('mediaType', MediaType.Video);
        this.remoteControl("getDuration" /* GetDuration */);
        this.remoteControl("getVideoTitle" /* GetVideoTitle */);
        Promise.all([
          this.fetchVideoInfo,
          (_a = this.pendingDurationCall) === null || _a === void 0 ? void 0 : _a.promise,
          (_b = this.pendingMediaTitleCall) === null || _b === void 0 ? void 0 : _b.promise,
        ]).then(([info, duration, mediaTitle]) => {
          var _a, _b, _c;
          this.requestTimeUpdates();
          this.dispatch('aspectRatio', `${(_a = info === null || info === void 0 ? void 0 : info.width) !== null && _a !== void 0 ? _a : 16}:${(_b = info === null || info === void 0 ? void 0 : info.height) !== null && _b !== void 0 ? _b : 9}`);
          this.dispatch('currentPoster', (_c = this.poster) !== null && _c !== void 0 ? _c : info === null || info === void 0 ? void 0 : info.poster);
          this.dispatch('duration', duration !== null && duration !== void 0 ? duration : -1);
          this.dispatch('mediaTitle', mediaTitle);
          this.dispatch('playbackReady', true);
        });
        this.hasLoaded = true;
      }
      onVimeoEvent(event, payload) {
        switch (event) {
          case "ready" /* Ready */:
            Object.values(VimeoEvent).forEach(e => {
              this.remoteControl("addEventListener" /* AddEventListener */, e);
            });
            break;
          case "loaded" /* Loaded */:
            this.onLoaded();
            break;
          case "play" /* Play */:
            // Incase of autoplay which might skip `Loaded` event.
            this.onLoaded();
            this.internalState.paused = false;
            this.dispatch('paused', false);
            break;
          case "playProgress" /* PlayProgress */:
            if (!this.internalState.playing) {
              this.dispatch('playing', true);
              this.internalState.playing = true;
              this.internalState.playbackStarted = true;
              this.pendingPlayRequest = window.setTimeout(() => {
                this.internalState.playRequest = false;
                this.pendingPlayRequest = undefined;
              }, 1000);
            }
            this.dispatch('buffering', false);
            this.onSeeked();
            break;
          case "pause" /* Pause */:
            this.internalState.paused = true;
            this.internalState.playing = false;
            this.dispatch('paused', true);
            this.dispatch('buffering', false);
            break;
          case "loadProgress" /* LoadProgress */:
            this.internalState.buffered = payload.seconds;
            this.dispatch('buffered', payload.seconds);
            break;
          case "bufferstart" /* BufferStart */:
            this.dispatch('buffering', true);
            // Attempt to detect `play` events early.
            if (this.internalState.paused) {
              this.internalState.paused = false;
              this.dispatch('paused', false);
              this.dispatch('playbackStarted', true);
            }
            break;
          case "bufferend" /* BufferEnd */:
            this.dispatch('buffering', false);
            if (this.internalState.paused)
              this.onSeeked();
            break;
          case "volumechange" /* VolumeChange */:
            if (payload.volume > 0) {
              const newVolume = Math.floor(payload.volume * 100);
              this.dispatch('muted', false);
              if (this.volume !== newVolume) {
                this.volume = newVolume;
                this.dispatch('volume', this.volume);
              }
            }
            else {
              this.dispatch('muted', true);
            }
            break;
          case "durationchange" /* DurationChange */:
            this.dispatch('duration', payload.duration);
            break;
          case "playbackratechange" /* PlaybackRateChange */:
            this.dispatch('playbackRate', payload.playbackRate);
            break;
          case "fullscreenchange" /* FullscreenChange */:
            this.dispatch('isFullscreenActive', payload.fullscreen);
            break;
          case "finish" /* Finish */:
            if (this.loop) {
              this.remoteControl("setCurrentTime" /* SetCurrentTime */, 0);
              setTimeout(() => {
                this.remoteControl("play" /* Play */);
              }, 200);
            }
            else {
              this.dispatch('playbackEnded', true);
            }
            break;
          case "error" /* Error */:
            this.vmError.emit(payload);
            break;
        }
      }
      onEmbedSrcChange() {
        this.hasLoaded = false;
        this.vmLoadStart.emit();
        this.dispatch('viewType', ViewType.Video);
      }
      onEmbedMessage(event) {
        const message = event.detail;
        if (!isUndefined(message.event))
          this.onVimeoEvent(message.event, message.data);
        if (!isUndefined(message.method))
          this.onVimeoMethod(message.method, message.value);
      }
      adjustPosition() {
        if (this.controls) {
          return {};
        }
        const [aw, ah] = this.aspectRatio.split(':').map(r => parseInt(r, 10));
        const height = 240;
        const padding = (100 / aw) * ah;
        const offset = (height - padding) / (height / 50);
        return {
          paddingBottom: `${height}%`,
          transform: `translateY(-${offset + 0.02}%)`,
        };
      }
      /** @internal */
      getAdapter() {
        return __awaiter$2(this, void 0, void 0, function* () {
          const canPlayRegex = /vimeo(?:\.com|)\/([0-9]{9,})/;
          const fileRegex = /vimeo\.com\/external\/[0-9]+\..+/;
          return {
            getInternalPlayer: () => __awaiter$2(this, void 0, void 0, function* () { return this.embed; }),
            play: () => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl("play" /* Play */);
            }),
            pause: () => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl("pause" /* Pause */);
            }),
            canPlay: (type) => __awaiter$2(this, void 0, void 0, function* () { return isString(type) && !fileRegex.test(type) && canPlayRegex.test(type); }),
            setCurrentTime: (time) => __awaiter$2(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.remoteControl("setCurrentTime" /* SetCurrentTime */, time);
              }
            }),
            setMuted: (muted) => __awaiter$2(this, void 0, void 0, function* () {
              if (!muted)
                this.volume = this.volume > 0 ? this.volume : 30;
              this.remoteControl("setVolume" /* SetVolume */, muted ? 0 : this.volume / 100);
            }),
            setVolume: (volume) => __awaiter$2(this, void 0, void 0, function* () {
              if (!this.muted) {
                this.remoteControl("setVolume" /* SetVolume */, volume / 100);
              }
              else {
                // Confirm volume was set.
                this.dispatch('volume', volume);
              }
            }),
            // @TODO how to check if Vimeo pro?
            canSetPlaybackRate: () => __awaiter$2(this, void 0, void 0, function* () { return false; }),
            setPlaybackRate: (rate) => __awaiter$2(this, void 0, void 0, function* () {
              this.remoteControl("setPlaybackRate" /* SetPlaybackRate */, rate);
            }),
          };
        });
      }
      render() {
        return (h("vm-embed", { class: { hideControls: !this.controls }, style: this.adjustPosition(), embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeJSON, preconnections: this.getPreconnections(), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
            this.embed = el;
          } }));
      }
      static get watchers() { return {
        "videoId": ["onVideoIdChange"],
        "poster": ["onCustomPosterChange"]
      }; }
      static get style() { return vimeoCss; }
    };

    const volumeControlCss = ".volumeControl{align-items:center;display:flex;position:relative;pointer-events:auto;box-sizing:border-box}vm-slider{width:75px;height:100%;margin:0;max-width:0;position:relative;z-index:3;transition:margin 0.2s cubic-bezier(0.4, 0, 1, 1),\n    max-width 0.2s cubic-bezier(0.4, 0, 1, 1);margin-left:calc(var(--vm-control-spacing) / 2) !important;visibility:hidden}vm-slider:hover{cursor:pointer}vm-slider.hidden{display:none}vm-slider.active{max-width:75px;visibility:visible;margin:0 calc(var(--vm-control-spacing) / 2)}";

    var __awaiter$1 = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const VolumeControl = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.keyboardDisposal = new Disposal();
        this.prevMuted = false;
        this.currentVolume = 50;
        this.isSliderActive = false;
        /**
         * The name of the low volume icon to resolve from the icon library.
         */
        this.lowVolumeIcon = 'volume-low';
        /**
         * The name of the high volume icon to resolve from the icon library.
         */
        this.highVolumeIcon = 'volume-high';
        /**
         * The name of the muted volume icon to resolve from the icon library.
         */
        this.mutedIcon = 'volume-mute';
        /**
         * Whether the tooltip is positioned above/below the control.
         */
        this.tooltipPosition = 'top';
        /**
         * Whether the tooltip should be hidden.
         */
        this.hideTooltip = false;
        /**
         * A pipe (`/`) separated string of JS keyboard keys, that when caught in a `keydown` event, will
         * toggle the muted state of the player.
         */
        this.muteKeys = 'm';
        /**
         * Prevents the volume being changed using the Up/Down arrow keys.
         */
        this.noKeyboard = false;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.volume = 50;
        /** @internal */
        this.isMobile = false;
        /** @internal */
        this.i18n = {};
        withComponentRegistry(this);
        withPlayerContext(this, ['volume', 'muted', 'isMobile', 'i18n']);
      }
      onNoKeyboardChange() {
        return __awaiter$1(this, void 0, void 0, function* () {
          this.keyboardDisposal.empty();
          if (this.noKeyboard)
            return;
          const player = yield findPlayer(this);
          if (isUndefined(player))
            return;
          this.keyboardDisposal.add(listen(player, 'keydown', (event) => {
            if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')
              return;
            const isUpArrow = event.key === 'ArrowUp';
            const newVolume = isUpArrow
              ? Math.min(100, this.volume + 5)
              : Math.max(0, this.volume - 5);
            this.dispatch('volume', parseInt(`${newVolume}`, 10));
          }));
        });
      }
      onPlayerVolumeChange() {
        this.currentVolume = this.muted ? 0 : this.volume;
        if (!this.muted && this.prevMuted && this.volume === 0) {
          this.dispatch('volume', 30);
        }
        this.prevMuted = this.muted;
      }
      connectedCallback() {
        this.prevMuted = this.muted;
        this.dispatch = createDispatcher(this);
        this.onNoKeyboardChange();
      }
      disconnectedCallback() {
        this.keyboardDisposal.empty();
      }
      onShowSlider() {
        clearTimeout(this.hideSliderTimeout);
        this.isSliderActive = true;
      }
      onHideSlider() {
        this.hideSliderTimeout = setTimeout(() => {
          this.isSliderActive = false;
        }, 100);
      }
      onVolumeChange(event) {
        const newVolume = event.detail;
        this.currentVolume = newVolume;
        this.dispatch('volume', newVolume);
        this.dispatch('muted', newVolume === 0);
      }
      onKeyDown(event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')
          return;
        event.stopPropagation();
      }
      render() {
        return (h("div", { class: "volumeControl", onMouseEnter: this.onShowSlider.bind(this), onMouseLeave: this.onHideSlider.bind(this) }, h("vm-mute-control", { keys: this.muteKeys, lowVolumeIcon: this.lowVolumeIcon, highVolumeIcon: this.highVolumeIcon, mutedIcon: this.mutedIcon, icons: this.icons, tooltipPosition: this.tooltipPosition, tooltipDirection: this.tooltipDirection, hideTooltip: this.hideTooltip, onVmFocus: this.onShowSlider.bind(this), onVmBlur: this.onHideSlider.bind(this) }), h("vm-slider", { class: {
            hidden: this.isMobile,
            active: this.isSliderActive,
          }, step: 5, max: 100, value: this.currentVolume, label: this.i18n.volume, onKeyDown: this.onKeyDown.bind(this), onVmFocus: this.onShowSlider.bind(this), onVmBlur: this.onHideSlider.bind(this), onVmValueChange: this.onVolumeChange.bind(this) })));
      }
      static get watchers() { return {
        "noKeyboard": ["onNoKeyboardChange"],
        "muted": ["onPlayerVolumeChange"],
        "volume": ["onPlayerVolumeChange"]
      }; }
      static get style() { return volumeControlCss; }
    };

    const mapYouTubePlaybackQuality = (quality) => {
      switch (quality) {
        case "unknown" /* Unknown */:
          return undefined;
        case "tiny" /* Tiny */:
          return '144p';
        case "small" /* Small */:
          return '240p';
        case "medium" /* Medium */:
          return '360p';
        case "large" /* Large */:
          return '480p';
        case "hd720" /* Hd720 */:
          return '720p';
        case "hd1080" /* Hd1080 */:
          return '1080p';
        case "highres" /* Highres */:
          return '1440p';
        case "max" /* Max */:
          return '2160p';
        default:
          return undefined;
      }
    };

    const youtubeCss = ":host{z-index:var(--vm-media-z-index)}";

    var __awaiter = function (thisArg, _arguments, P, generator) {
      function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
          step(generator.next(value));
        }
        catch (e) {
          reject(e);
        } }
        function rejected(value) { try {
          step(generator["throw"](value));
        }
        catch (e) {
          reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    const posterCache = new Map();
    const YouTube = class extends HTMLElement {
      constructor() {
        super();
        this.__registerHost();
        attachShadow(this);
        this.vmLoadStart = createEvent(this, "vmLoadStart", 7);
        this.defaultInternalState = {};
        this.internalState = {
          paused: true,
          duration: 0,
          seeking: false,
          playbackReady: false,
          playbackStarted: false,
          currentTime: 0,
          lastTimeUpdate: 0,
          playbackRate: 1,
          state: -1,
        };
        this.embedSrc = '';
        this.mediaTitle = '';
        /**
         * Whether cookies should be enabled on the embed.
         */
        this.cookies = false;
        /**
         * Whether the fullscreen control should be shown.
         */
        this.showFullscreenControl = true;
        /** @internal */
        this.language = 'en';
        /** @internal */
        this.autoplay = false;
        /** @internal */
        this.controls = false;
        /** @internal */
        this.loop = false;
        /** @internal */
        this.muted = false;
        /** @internal */
        this.playsinline = false;
        withComponentRegistry(this);
        withProviderConnect(this);
        withProviderContext(this);
      }
      onVideoIdChange() {
        if (!this.videoId) {
          this.embedSrc = '';
          return;
        }
        this.embedSrc = `${this.getOrigin()}/embed/${this.videoId}`;
        this.fetchPosterURL = this.findPosterURL();
      }
      onCustomPosterChange() {
        this.dispatch('currentPoster', this.poster);
      }
      connectedCallback() {
        this.dispatch = createProviderDispatcher(this);
        this.dispatch('viewType', ViewType.Video);
        this.onVideoIdChange();
        this.defaultInternalState = Object.assign({}, this.internalState);
      }
      componentDidLoad() {
        this.initialMuted = this.muted;
      }
      /** @internal */
      getAdapter() {
        return __awaiter(this, void 0, void 0, function* () {
          const canPlayRegex = /(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/;
          return {
            getInternalPlayer: () => __awaiter(this, void 0, void 0, function* () { return this.embed; }),
            play: () => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("playVideo" /* Play */);
            }),
            pause: () => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("pauseVideo" /* Pause */);
            }),
            canPlay: (type) => __awaiter(this, void 0, void 0, function* () { return isString(type) && canPlayRegex.test(type); }),
            setCurrentTime: (time) => __awaiter(this, void 0, void 0, function* () {
              if (time !== this.internalState.currentTime) {
                this.remoteControl("seekTo" /* Seek */, time);
              }
            }),
            setMuted: (muted) => __awaiter(this, void 0, void 0, function* () {
              muted
                ? this.remoteControl("mute" /* Mute */)
                : this.remoteControl("unMute" /* Unmute */);
            }),
            setVolume: (volume) => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("setVolume" /* SetVolume */, volume);
            }),
            canSetPlaybackRate: () => __awaiter(this, void 0, void 0, function* () { return true; }),
            setPlaybackRate: (rate) => __awaiter(this, void 0, void 0, function* () {
              this.remoteControl("setPlaybackRate" /* SetPlaybackRate */, rate);
            }),
          };
        });
      }
      getOrigin() {
        return !this.cookies
          ? 'https://www.youtube-nocookie.com'
          : 'https://www.youtube.com';
      }
      getPreconnections() {
        return [
          this.getOrigin(),
          'https://www.google.com',
          'https://googleads.g.doubleclick.net',
          'https://static.doubleclick.net',
          'https://s.ytimg.com',
          'https://i.ytimg.com',
        ];
      }
      remoteControl(command, arg) {
        return this.embed.postMessage({
          event: 'command',
          func: command,
          args: arg ? [arg] : undefined,
        });
      }
      buildParams() {
        return {
          enablejsapi: 1,
          cc_lang_pref: this.language,
          hl: this.language,
          fs: this.showFullscreenControl ? 1 : 0,
          controls: this.controls ? 1 : 0,
          disablekb: !this.controls ? 1 : 0,
          iv_load_policy: this.controls ? 1 : 3,
          mute: this.initialMuted ? 1 : 0,
          playsinline: this.playsinline ? 1 : 0,
          autoplay: this.autoplay ? 1 : 0,
        };
      }
      onEmbedSrcChange() {
        this.vmLoadStart.emit();
        this.dispatch('viewType', ViewType.Video);
      }
      onEmbedLoaded() {
        // Seems like we have to wait a random small delay or else YT player isn't ready.
        window.setTimeout(() => this.embed.postMessage({ event: 'listening' }), 100);
      }
      findPosterURL() {
        return __awaiter(this, void 0, void 0, function* () {
          if (posterCache.has(this.videoId))
            return posterCache.get(this.videoId);
          const posterURL = (quality) => `https://i.ytimg.com/vi/${this.videoId}/${quality}.jpg`;
          /**
           * We are testing a that the image has a min-width of 121px because if the thumbnail does not
           * exist YouTube returns a blank/error image that is 120px wide.
           */
          return loadImage(posterURL('maxresdefault'), 121) // 1080p (no padding)
            .catch(() => loadImage(posterURL('sddefault'), 121)) // 640p (padded 4:3)
            .catch(() => loadImage(posterURL('hqdefault'), 121)) // 480p (padded 4:3)
            .then(img => {
            const poster = img.src;
            posterCache.set(this.videoId, poster);
            return poster;
          });
        });
      }
      onCued() {
        if (this.internalState.playbackReady)
          return;
        this.internalState = Object.assign({}, this.defaultInternalState);
        this.dispatch('currentSrc', this.embedSrc);
        this.dispatch('mediaType', MediaType.Video);
        this.fetchPosterURL.then(poster => {
          var _a;
          this.dispatch('currentPoster', (_a = this.poster) !== null && _a !== void 0 ? _a : poster);
          this.dispatch('playbackReady', true);
        });
        this.internalState.playbackReady = true;
      }
      onPlayerStateChange(state) {
        // Sometimes the embed falls back to an unstarted state for some unknown reason, this will
        // make sure the player is configured to the right starting state.
        if (this.internalState.playbackReady &&
          state === -1 /* Unstarted */) {
          this.internalState.paused = true;
          this.internalState.playbackStarted = false;
          this.dispatch('buffering', false);
          this.dispatch('paused', true);
          this.dispatch('playbackStarted', false);
          return;
        }
        const isPlaying = state === 1 /* Playing */;
        const isBuffering = state === 3 /* Buffering */;
        this.dispatch('buffering', isBuffering);
        // Attempt to detect `play` events early.
        if (this.internalState.paused && (isBuffering || isPlaying)) {
          this.internalState.paused = false;
          this.dispatch('paused', false);
          if (!this.internalState.playbackStarted) {
            this.dispatch('playbackStarted', true);
            this.internalState.playbackStarted = true;
          }
        }
        switch (state) {
          case 5 /* Cued */:
            this.onCued();
            break;
          case 1 /* Playing */:
            // Incase of autoplay which might skip `Cued` event.
            this.onCued();
            this.dispatch('playing', true);
            break;
          case 2 /* Paused */:
            this.internalState.paused = true;
            this.dispatch('paused', true);
            break;
          case 0 /* Ended */:
            if (this.loop) {
              window.setTimeout(() => {
                this.remoteControl("playVideo" /* Play */);
              }, 150);
            }
            else {
              this.dispatch('playbackEnded', true);
              this.internalState.paused = true;
              this.dispatch('paused', true);
            }
            break;
        }
        this.internalState.state = state;
      }
      calcCurrentTime(time) {
        let currentTime = time;
        if (this.internalState.state === 0 /* Ended */) {
          return this.internalState.duration;
        }
        if (this.internalState.state === 1 /* Playing */) {
          const elapsedTime = (Date.now() / 1e3 - this.defaultInternalState.lastTimeUpdate) *
            this.internalState.playbackRate;
          if (elapsedTime > 0)
            currentTime += Math.min(elapsedTime, 1);
        }
        return currentTime;
      }
      onTimeChange(time) {
        const currentTime = this.calcCurrentTime(time);
        this.dispatch('currentTime', currentTime);
        // This is the only way to detect `seeking`.
        if (Math.abs(this.internalState.currentTime - currentTime) > 1.5) {
          this.internalState.seeking = true;
          this.dispatch('seeking', true);
        }
        this.internalState.currentTime = currentTime;
      }
      onBufferedChange(buffered) {
        this.dispatch('buffered', buffered);
        /**
         * This is the only way to detect `seeked`. Unfortunately while the player is `paused` `seeking`
         * and `seeked` will fire at the same time, there are no updates inbetween -_-. We need an
         * artifical delay between the two events.
         */
        if (this.internalState.seeking &&
          buffered > this.internalState.currentTime) {
          window.setTimeout(() => {
            this.internalState.seeking = false;
            this.dispatch('seeking', false);
          }, this.internalState.paused ? 100 : 0);
        }
      }
      onEmbedMessage(event) {
        const message = event.detail;
        const { info } = message;
        if (!info)
          return;
        if (isObject(info.videoData))
          this.dispatch('mediaTitle', info.videoData.title);
        if (isNumber(info.duration)) {
          this.internalState.duration = info.duration;
          this.dispatch('duration', info.duration);
        }
        if (isArray(info.availablePlaybackRates)) {
          this.dispatch('playbackRates', info.availablePlaybackRates);
        }
        if (isNumber(info.playbackRate)) {
          this.internalState.playbackRate = info.playbackRate;
          this.dispatch('playbackRate', info.playbackRate);
        }
        if (isNumber(info.currentTime))
          this.onTimeChange(info.currentTime);
        if (isNumber(info.currentTimeLastUpdated)) {
          this.internalState.lastTimeUpdate = info.currentTimeLastUpdated;
        }
        if (isNumber(info.videoLoadedFraction)) {
          this.onBufferedChange(info.videoLoadedFraction * this.internalState.duration);
        }
        if (isNumber(info.volume))
          this.dispatch('volume', info.volume);
        if (isBoolean(info.muted))
          this.dispatch('muted', info.muted);
        if (isArray(info.availableQualityLevels)) {
          this.dispatch('playbackQualities', info.availableQualityLevels.map(q => mapYouTubePlaybackQuality(q)));
        }
        if (isString(info.playbackQuality)) {
          this.dispatch('playbackQuality', mapYouTubePlaybackQuality(info.playbackQuality));
        }
        if (isNumber(info.playerState))
          this.onPlayerStateChange(info.playerState);
      }
      render() {
        return (h("vm-embed", { embedSrc: this.embedSrc, mediaTitle: this.mediaTitle, origin: this.getOrigin(), params: this.buildParams(), decoder: decodeJSON, preconnections: this.getPreconnections(), onVmEmbedLoaded: this.onEmbedLoaded.bind(this), onVmEmbedMessage: this.onEmbedMessage.bind(this), onVmEmbedSrcChange: this.onEmbedSrcChange.bind(this), ref: (el) => {
            this.embed = el;
          } }));
      }
      static get watchers() { return {
        "cookies": ["onVideoIdChange"],
        "videoId": ["onVideoIdChange"],
        "poster": ["onCustomPosterChange"]
      }; }
      static get style() { return youtubeCss; }
    };

    const VmAudio = /*@__PURE__*/proxyCustomElement(Audio, [4,"vm-audio",{"willAttach":[4,"will-attach"],"crossOrigin":[1,"cross-origin"],"preload":[1],"disableRemotePlayback":[4,"disable-remote-playback"],"mediaTitle":[1,"media-title"]}]);
    const VmCaptionControl = /*@__PURE__*/proxyCustomElement(CaptionControl, [1,"vm-caption-control",{"showIcon":[1,"show-icon"],"hideIcon":[1,"hide-icon"],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"icons":[1],"keys":[1],"i18n":[16],"playbackReady":[4,"playback-ready"],"textTracks":[16],"isTextTrackVisible":[4,"is-text-track-visible"],"canToggleCaptionVisibility":[32]}]);
    const VmCaptions = /*@__PURE__*/proxyCustomElement(Captions, [1,"vm-captions",{"hidden":[4],"isControlsActive":[4,"is-controls-active"],"isVideoView":[4,"is-video-view"],"playbackStarted":[4,"playback-started"],"textTracks":[16],"currentTextTrack":[2,"current-text-track"],"isTextTrackVisible":[4,"is-text-track-visible"],"isEnabled":[32],"cue":[32],"fontSize":[32]}]);
    const VmClickToPlay = /*@__PURE__*/proxyCustomElement(ClickToPlay, [1,"vm-click-to-play",{"useOnMobile":[4,"use-on-mobile"],"paused":[4],"isVideoView":[4,"is-video-view"],"isMobile":[4,"is-mobile"]}]);
    const VmControl = /*@__PURE__*/proxyCustomElement(Control, [1,"vm-control",{"keys":[1],"identifier":[1],"hidden":[4],"label":[1],"menu":[1],"expanded":[4],"pressed":[4],"isTouch":[4,"is-touch"],"describedBy":[32],"showTapHighlight":[32]}]);
    const VmControlGroup = /*@__PURE__*/proxyCustomElement(ControlNewLine, [1,"vm-control-group",{"space":[1]}]);
    const VmControlSpacer = /*@__PURE__*/proxyCustomElement(ControlSpacer, [1,"vm-control-spacer"]);
    const VmControls = /*@__PURE__*/proxyCustomElement(Controls, [1,"vm-controls",{"hidden":[4],"fullWidth":[4,"full-width"],"fullHeight":[4,"full-height"],"direction":[1],"align":[1],"justify":[1],"pin":[513],"activeDuration":[2,"active-duration"],"waitForPlaybackStart":[4,"wait-for-playback-start"],"hideWhenPaused":[4,"hide-when-paused"],"hideOnMouseLeave":[4,"hide-on-mouse-leave"],"isAudioView":[4,"is-audio-view"],"isSettingsActive":[4,"is-settings-active"],"playbackReady":[4,"playback-ready"],"isControlsActive":[4,"is-controls-active"],"paused":[4],"playbackStarted":[4,"playback-started"],"isInteracting":[32]}]);
    const VmCurrentTime = /*@__PURE__*/proxyCustomElement(CurrentTime, [1,"vm-current-time",{"currentTime":[2,"current-time"],"i18n":[16],"alwaysShowHours":[4,"always-show-hours"]}]);
    const VmDailymotion = /*@__PURE__*/proxyCustomElement(Dailymotion, [1,"vm-dailymotion",{"videoId":[1,"video-id"],"shouldAutoplayQueue":[4,"should-autoplay-queue"],"showUpNextQueue":[4,"show-up-next-queue"],"showShareButtons":[4,"show-share-buttons"],"color":[1],"syndication":[1],"showDailymotionLogo":[4,"show-dailymotion-logo"],"showVideoInfo":[4,"show-video-info"],"language":[1],"autoplay":[4],"controls":[4],"poster":[1],"logger":[16],"loop":[4],"muted":[4],"playsinline":[4],"embedSrc":[32],"mediaTitle":[32]}]);
    const VmDash = /*@__PURE__*/proxyCustomElement(Dash, [1,"vm-dash",{"src":[1],"version":[1],"libSrc":[1,"lib-src"],"config":[16],"autoplay":[4],"crossOrigin":[1,"cross-origin"],"preload":[1],"poster":[1],"controlsList":[1,"controls-list"],"autoPiP":[4,"auto-pip"],"disablePiP":[4,"disable-pip"],"disableRemotePlayback":[4,"disable-remote-playback"],"mediaTitle":[1,"media-title"],"enableTextTracksByDefault":[4,"enable-text-tracks-by-default"],"shouldRenderNativeTextTracks":[4,"should-render-native-text-tracks"],"isTextTrackVisible":[4,"is-text-track-visible"],"currentTextTrack":[2,"current-text-track"],"hasAttached":[32]},[[0,"vmMediaElChange","onMediaElChange"]]]);
    const VmDblClickFullscreen = /*@__PURE__*/proxyCustomElement(DblClickFullscreen, [1,"vm-dbl-click-fullscreen",{"useOnMobile":[4,"use-on-mobile"],"isFullscreenActive":[4,"is-fullscreen-active"],"isVideoView":[4,"is-video-view"],"playbackReady":[4,"playback-ready"],"isMobile":[4,"is-mobile"],"canSetFullscreen":[32]}]);
    const VmDefaultControls = /*@__PURE__*/proxyCustomElement(DefaultControls, [1,"vm-default-controls",{"activeDuration":[2,"active-duration"],"waitForPlaybackStart":[4,"wait-for-playback-start"],"hideWhenPaused":[4,"hide-when-paused"],"hideOnMouseLeave":[4,"hide-on-mouse-leave"],"theme":[1],"isMobile":[4,"is-mobile"],"isLive":[4,"is-live"],"isAudioView":[4,"is-audio-view"],"isVideoView":[4,"is-video-view"]}]);
    const VmDefaultSettings = /*@__PURE__*/proxyCustomElement(DefaultSettings, [1,"vm-default-settings",{"pin":[513],"i18n":[16],"playbackReady":[4,"playback-ready"],"playbackRate":[2,"playback-rate"],"playbackRates":[16],"isVideoView":[4,"is-video-view"],"playbackQuality":[1,"playback-quality"],"playbackQualities":[16],"textTracks":[16],"currentTextTrack":[2,"current-text-track"],"audioTracks":[16],"currentAudioTrack":[2,"current-audio-track"],"isTextTrackVisible":[4,"is-text-track-visible"],"canSetPlaybackRate":[32],"canSetPlaybackQuality":[32],"canSetTextTrack":[32],"canSetAudioTrack":[32]}]);
    const VmDefaultUi = /*@__PURE__*/proxyCustomElement(DefaultUI, [1,"vm-default-ui",{"noClickToPlay":[4,"no-click-to-play"],"noDblClickFullscreen":[4,"no-dbl-click-fullscreen"],"noCaptions":[4,"no-captions"],"noPoster":[4,"no-poster"],"noSpinner":[4,"no-spinner"],"noControls":[4,"no-controls"],"noSettings":[4,"no-settings"],"noLoadingScreen":[4,"no-loading-screen"]}]);
    const VmEmbed = /*@__PURE__*/proxyCustomElement(Embed, [1,"vm-embed",{"embedSrc":[1,"embed-src"],"mediaTitle":[1,"media-title"],"params":[1],"origin":[1],"preconnections":[16],"decoder":[16],"srcWithParams":[32],"hasEnteredViewport":[32]},[[8,"message","onWindowMessage"]]]);
    const VmEndTime = /*@__PURE__*/proxyCustomElement(EndTime, [1,"vm-end-time",{"duration":[2],"i18n":[16],"alwaysShowHours":[4,"always-show-hours"]}]);
    const VmFile = /*@__PURE__*/proxyCustomElement(File, [6,"vm-file",{"willAttach":[4,"will-attach"],"crossOrigin":[1,"cross-origin"],"preload":[1],"poster":[1],"mediaTitle":[1,"media-title"],"controlsList":[1,"controls-list"],"autoPiP":[4,"auto-pip"],"disablePiP":[4,"disable-pip"],"disableRemotePlayback":[4,"disable-remote-playback"],"viewType":[1,"view-type"],"playbackRates":[16],"language":[1],"autoplay":[4],"controls":[4],"logger":[16],"loop":[4],"muted":[4],"playsinline":[4],"noConnect":[4,"no-connect"],"paused":[4],"currentTime":[2,"current-time"],"volume":[2],"playbackReady":[4,"playback-ready"],"playbackStarted":[4,"playback-started"],"currentTextTrack":[2,"current-text-track"],"hasCustomTextManager":[4,"has-custom-text-manager"],"isTextTrackVisible":[4,"is-text-track-visible"],"shouldRenderNativeTextTracks":[4,"should-render-native-text-tracks"],"vmPoster":[32]},[[0,"vmMediaProviderConnect","onProviderConnect"],[0,"vmMediaProviderDisconnect","onProviderDisconnect"]]]);
    const VmFullscreenControl = /*@__PURE__*/proxyCustomElement(FullscreenControl, [1,"vm-fullscreen-control",{"enterIcon":[1,"enter-icon"],"exitIcon":[1,"exit-icon"],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"keys":[1],"isFullscreenActive":[4,"is-fullscreen-active"],"i18n":[16],"playbackReady":[4,"playback-ready"],"canSetFullscreen":[32]}]);
    const VmHls = /*@__PURE__*/proxyCustomElement(HLS, [4,"vm-hls",{"version":[1],"libSrc":[1,"lib-src"],"config":[8],"crossOrigin":[1,"cross-origin"],"preload":[1],"poster":[1],"controlsList":[1,"controls-list"],"autoPiP":[4,"auto-pip"],"disablePiP":[4,"disable-pip"],"disableRemotePlayback":[4,"disable-remote-playback"],"playbackReady":[4,"playback-ready"],"mediaTitle":[1,"media-title"],"hasAttached":[32]},[[0,"vmMediaElChange","onMediaElChange"],[0,"vmSrcSetChange","onSrcChange"]]]);
    const VmIcon = /*@__PURE__*/proxyCustomElement(Icon, [1,"vm-icon",{"name":[1],"src":[1],"label":[1],"library":[1],"icons":[1],"svg":[32]}]);
    const VmIconLibrary = /*@__PURE__*/proxyCustomElement(IconLibrary, [1,"vm-icon-library",{"name":[1],"resolver":[16],"icons":[1]}]);
    const VmLiveIndicator = /*@__PURE__*/proxyCustomElement(LiveIndicator, [1,"vm-live-indicator",{"isLive":[4,"is-live"],"i18n":[16]}]);
    const VmLoadingScreen = /*@__PURE__*/proxyCustomElement(LoadingScreen, [1,"vm-loading-screen",{"playbackReady":[4,"playback-ready"],"hideDots":[4,"hide-dots"]}]);
    const VmMenu = /*@__PURE__*/proxyCustomElement(Menu, [1,"vm-menu",{"active":[1540],"identifier":[1],"controller":[16],"slideInDirection":[1,"slide-in-direction"],"activeMenuItem":[32],"activeSubmenu":[32]},[[0,"vmOpenSubmenu","onOpenSubmenu"],[0,"vmCloseSubmenu","onCloseSubmenu"],[8,"click","onWindowClick"],[8,"keydown","onWindowKeyDown"]]]);
    const VmMenuItem = /*@__PURE__*/proxyCustomElement(MenuItem, [1,"vm-menu-item",{"identifier":[1],"hidden":[4],"label":[1],"menu":[16],"expanded":[4],"checked":[4],"hint":[1],"badge":[1],"checkIcon":[1,"check-icon"],"icons":[1],"isTouch":[4,"is-touch"],"showTapHighlight":[32]}]);
    const VmMenuRadio = /*@__PURE__*/proxyCustomElement(MenuRadio, [1,"vm-menu-radio",{"label":[1],"value":[1],"checked":[1028],"badge":[1],"checkIcon":[1,"check-icon"],"icons":[1]}]);
    const VmMenuRadioGroup = /*@__PURE__*/proxyCustomElement(MenuRadioGroup, [1,"vm-menu-radio-group",{"value":[1025]},[[0,"vmCheck","onSelectionChange"]]]);
    const VmMuteControl = /*@__PURE__*/proxyCustomElement(MuteControl, [1,"vm-mute-control",{"lowVolumeIcon":[1,"low-volume-icon"],"highVolumeIcon":[1,"high-volume-icon"],"mutedIcon":[1,"muted-icon"],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"keys":[1],"volume":[2],"muted":[4],"i18n":[16]}]);
    const VmPipControl = /*@__PURE__*/proxyCustomElement(PiPControl, [1,"vm-pip-control",{"enterIcon":[1,"enter-icon"],"exitIcon":[1,"exit-icon"],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"keys":[1],"isPiPActive":[4,"is-pi-p-active"],"i18n":[16],"playbackReady":[4,"playback-ready"],"canSetPiP":[32]}]);
    const VmPlaybackControl = /*@__PURE__*/proxyCustomElement(PlaybackControl, [1,"vm-playback-control",{"playIcon":[1,"play-icon"],"pauseIcon":[1,"pause-icon"],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"keys":[1],"paused":[4],"i18n":[16]}]);
    const VmPlayer = /*@__PURE__*/proxyCustomElement(Player$2, [1,"vm-player",{"logger":[16],"theme":[513],"icons":[513],"paused":[1028],"playing":[1028],"duration":[1026],"mediaTitle":[1025,"media-title"],"currentProvider":[1025,"current-provider"],"currentSrc":[1025,"current-src"],"currentPoster":[1025,"current-poster"],"currentTime":[1026,"current-time"],"autoplay":[4],"ready":[1540],"playbackReady":[1028,"playback-ready"],"loop":[4],"muted":[1028],"buffered":[1026],"playbackRate":[1026,"playback-rate"],"playbackRates":[1040],"playbackQuality":[1025,"playback-quality"],"playbackQualities":[1040],"seeking":[1028],"debug":[4],"playbackStarted":[1028,"playback-started"],"playbackEnded":[1028,"playback-ended"],"buffering":[1028],"controls":[4],"isControlsActive":[4,"is-controls-active"],"isSettingsActive":[1028,"is-settings-active"],"volume":[1026],"isFullscreenActive":[1028,"is-fullscreen-active"],"aspectRatio":[1025,"aspect-ratio"],"viewType":[1025,"view-type"],"isAudioView":[1028,"is-audio-view"],"isVideoView":[1028,"is-video-view"],"mediaType":[1025,"media-type"],"isAudio":[1028,"is-audio"],"isVideo":[1028,"is-video"],"isLive":[1028,"is-live"],"isMobile":[1028,"is-mobile"],"isTouch":[1028,"is-touch"],"isPiPActive":[1028,"is-pi-p-active"],"textTracks":[16],"currentTextTrack":[2,"current-text-track"],"isTextTrackVisible":[4,"is-text-track-visible"],"shouldRenderNativeTextTracks":[4,"should-render-native-text-tracks"],"audioTracks":[16],"currentAudioTrack":[2,"current-audio-track"],"autopause":[4],"playsinline":[4],"language":[1025],"translations":[1040],"languages":[1040],"i18n":[1040],"container":[32]},[[0,"vmError","onError"]]]);
    const VmPoster = /*@__PURE__*/proxyCustomElement(Poster, [1,"vm-poster",{"fit":[1],"isVideoView":[4,"is-video-view"],"currentPoster":[1,"current-poster"],"mediaTitle":[1,"media-title"],"playbackStarted":[4,"playback-started"],"currentTime":[2,"current-time"],"isHidden":[32],"isActive":[32],"hasLoaded":[32]}]);
    const VmScrim = /*@__PURE__*/proxyCustomElement(Scrim, [1,"vm-scrim",{"gradient":[1],"isVideoView":[4,"is-video-view"],"isControlsActive":[4,"is-controls-active"]}]);
    const VmScrubberControl = /*@__PURE__*/proxyCustomElement(ScrubberControl, [1,"vm-scrubber-control",{"alwaysShowHours":[4,"always-show-hours"],"hideTooltip":[4,"hide-tooltip"],"currentTime":[2,"current-time"],"duration":[2],"noKeyboard":[4,"no-keyboard"],"buffering":[4],"buffered":[2],"i18n":[16],"timestamp":[32],"endTime":[32]}]);
    const VmSettings = /*@__PURE__*/proxyCustomElement(Settings, [1,"vm-settings",{"pin":[513],"active":[1540],"isMobile":[4,"is-mobile"],"isAudioView":[4,"is-audio-view"],"menuHeight":[32]}]);
    const VmSettingsControl = /*@__PURE__*/proxyCustomElement(SettingsControl, [1,"vm-settings-control",{"icon":[1],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"menu":[1],"expanded":[4],"i18n":[16],"vmSettings":[32]}]);
    const VmSkeleton = /*@__PURE__*/proxyCustomElement(Skeleton, [1,"vm-skeleton",{"effect":[1],"ready":[4],"hidden":[32]}]);
    const VmSlider = /*@__PURE__*/proxyCustomElement(Slider, [1,"vm-slider",{"step":[2],"min":[2],"max":[2],"value":[2],"valueText":[1,"value-text"],"label":[1]}]);
    const VmSpinner = /*@__PURE__*/proxyCustomElement(Spinner, [1,"vm-spinner",{"isVideoView":[4,"is-video-view"],"currentProvider":[1,"current-provider"],"showWhenMediaLoading":[4,"show-when-media-loading"],"playbackReady":[4,"playback-ready"],"buffering":[4],"isHidden":[32],"isActive":[32]}]);
    const VmSubmenu = /*@__PURE__*/proxyCustomElement(Submenu, [1,"vm-submenu",{"label":[1],"hint":[1],"slideInDirection":[1,"slide-in-direction"],"active":[1540],"menu":[32],"controller":[32]}]);
    const VmTime = /*@__PURE__*/proxyCustomElement(Time, [1,"vm-time",{"label":[1],"seconds":[2],"alwaysShowHours":[4,"always-show-hours"]}]);
    const VmTimeProgress = /*@__PURE__*/proxyCustomElement(TimeProgress, [1,"vm-time-progress",{"separator":[1],"alwaysShowHours":[4,"always-show-hours"]}]);
    const VmTooltip = /*@__PURE__*/proxyCustomElement(Tooltip, [1,"vm-tooltip",{"hidden":[4],"active":[4],"position":[1],"direction":[1],"isTouch":[4,"is-touch"],"isMobile":[4,"is-mobile"]}]);
    const VmUi = /*@__PURE__*/proxyCustomElement(UI, [1,"vm-ui",{"isVideoView":[4,"is-video-view"],"playsinline":[4],"isFullscreenActive":[4,"is-fullscreen-active"]}]);
    const VmVideo = /*@__PURE__*/proxyCustomElement(Video, [4,"vm-video",{"willAttach":[4,"will-attach"],"hasCustomTextManager":[4,"has-custom-text-manager"],"crossOrigin":[1,"cross-origin"],"preload":[1],"poster":[1],"controlsList":[1,"controls-list"],"autoPiP":[4,"auto-pip"],"disablePiP":[4,"disable-pip"],"disableRemotePlayback":[4,"disable-remote-playback"],"mediaTitle":[1,"media-title"]},[[0,"vmMediaProviderConnect","onProviderConnect"],[0,"vmMediaProviderDisconnect","onProviderDisconnect"]]]);
    const VmVimeo = /*@__PURE__*/proxyCustomElement(Vimeo, [1,"vm-vimeo",{"videoId":[1,"video-id"],"byline":[4],"color":[1],"portrait":[4],"noAutoAspectRatio":[4,"no-auto-aspect-ratio"],"poster":[1],"cookies":[4],"language":[1],"aspectRatio":[1,"aspect-ratio"],"autoplay":[4],"controls":[4],"logger":[16],"loop":[4],"muted":[4],"playsinline":[4],"embedSrc":[32],"mediaTitle":[32]}]);
    const VmVolumeControl = /*@__PURE__*/proxyCustomElement(VolumeControl, [1,"vm-volume-control",{"lowVolumeIcon":[1,"low-volume-icon"],"highVolumeIcon":[1,"high-volume-icon"],"mutedIcon":[1,"muted-icon"],"icons":[1],"tooltipPosition":[1,"tooltip-position"],"tooltipDirection":[1,"tooltip-direction"],"hideTooltip":[4,"hide-tooltip"],"muteKeys":[1,"mute-keys"],"noKeyboard":[4,"no-keyboard"],"muted":[4],"volume":[2],"isMobile":[4,"is-mobile"],"i18n":[16],"currentVolume":[32],"isSliderActive":[32]}]);
    const VmYoutube = /*@__PURE__*/proxyCustomElement(YouTube, [1,"vm-youtube",{"cookies":[4],"videoId":[1,"video-id"],"showFullscreenControl":[4,"show-fullscreen-control"],"poster":[1],"language":[1],"autoplay":[4],"controls":[4],"logger":[16],"loop":[4],"muted":[4],"playsinline":[4],"embedSrc":[32],"mediaTitle":[32]}]);

    /* node_modules/@vime/svelte/src/svelte/Audio.svelte generated by Svelte v3.44.2 */

    define$1('vm-audio', VmAudio);
    define$1('vm-file', VmFile);

    /* node_modules/@vime/svelte/src/svelte/CaptionControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-caption-control', VmCaptionControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Captions.svelte generated by Svelte v3.44.2 */

    define$1('vm-captions', VmCaptions);

    /* node_modules/@vime/svelte/src/svelte/ClickToPlay.svelte generated by Svelte v3.44.2 */

    define$1('vm-click-to-play', VmClickToPlay);

    /* node_modules/@vime/svelte/src/svelte/Control.svelte generated by Svelte v3.44.2 */

    define$1('vm-control', VmControl);

    /* node_modules/@vime/svelte/src/svelte/ControlGroup.svelte generated by Svelte v3.44.2 */

    define$1('vm-control-group', VmControlGroup);

    /* node_modules/@vime/svelte/src/svelte/ControlSpacer.svelte generated by Svelte v3.44.2 */

    define$1('vm-control-spacer', VmControlSpacer);

    /* node_modules/@vime/svelte/src/svelte/Controls.svelte generated by Svelte v3.44.2 */

    define$1('vm-controls', VmControls);

    /* node_modules/@vime/svelte/src/svelte/CurrentTime.svelte generated by Svelte v3.44.2 */

    define$1('vm-current-time', VmCurrentTime);
    define$1('vm-time', VmTime);

    /* node_modules/@vime/svelte/src/svelte/Dailymotion.svelte generated by Svelte v3.44.2 */

    define$1('vm-dailymotion', VmDailymotion);
    define$1('vm-embed', VmEmbed);

    /* node_modules/@vime/svelte/src/svelte/Dash.svelte generated by Svelte v3.44.2 */

    define$1('vm-dash', VmDash);
    define$1('vm-file', VmFile);
    define$1('vm-video', VmVideo);

    /* node_modules/@vime/svelte/src/svelte/DblClickFullscreen.svelte generated by Svelte v3.44.2 */

    define$1('vm-dbl-click-fullscreen', VmDblClickFullscreen);

    /* node_modules/@vime/svelte/src/svelte/DefaultControls.svelte generated by Svelte v3.44.2 */

    define$1('vm-default-controls', VmDefaultControls);
    define$1('vm-caption-control', VmCaptionControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);
    define$1('vm-control-group', VmControlGroup);
    define$1('vm-control-spacer', VmControlSpacer);
    define$1('vm-controls', VmControls);
    define$1('vm-current-time', VmCurrentTime);
    define$1('vm-time', VmTime);
    define$1('vm-end-time', VmEndTime);
    define$1('vm-fullscreen-control', VmFullscreenControl);
    define$1('vm-live-indicator', VmLiveIndicator);
    define$1('vm-mute-control', VmMuteControl);
    define$1('vm-pip-control', VmPipControl);
    define$1('vm-playback-control', VmPlaybackControl);
    define$1('vm-scrim', VmScrim);
    define$1('vm-scrubber-control', VmScrubberControl);
    define$1('vm-slider', VmSlider);
    define$1('vm-settings-control', VmSettingsControl);
    define$1('vm-time-progress', VmTimeProgress);
    define$1('vm-volume-control', VmVolumeControl);

    /* node_modules/@vime/svelte/src/svelte/DefaultSettings.svelte generated by Svelte v3.44.2 */

    define$1('vm-default-settings', VmDefaultSettings);
    define$1('vm-icon', VmIcon);
    define$1('vm-menu', VmMenu);
    define$1('vm-menu-item', VmMenuItem);
    define$1('vm-menu-radio', VmMenuRadio);
    define$1('vm-menu-radio-group', VmMenuRadioGroup);
    define$1('vm-settings', VmSettings);
    define$1('vm-submenu', VmSubmenu);

    /* node_modules/@vime/svelte/src/svelte/DefaultUi.svelte generated by Svelte v3.44.2 */

    define$1('vm-default-ui', VmDefaultUi);
    define$1('vm-caption-control', VmCaptionControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);
    define$1('vm-captions', VmCaptions);
    define$1('vm-click-to-play', VmClickToPlay);
    define$1('vm-control-group', VmControlGroup);
    define$1('vm-control-spacer', VmControlSpacer);
    define$1('vm-controls', VmControls);
    define$1('vm-current-time', VmCurrentTime);
    define$1('vm-time', VmTime);
    define$1('vm-dbl-click-fullscreen', VmDblClickFullscreen);
    define$1('vm-default-controls', VmDefaultControls);
    define$1('vm-end-time', VmEndTime);
    define$1('vm-fullscreen-control', VmFullscreenControl);
    define$1('vm-live-indicator', VmLiveIndicator);
    define$1('vm-mute-control', VmMuteControl);
    define$1('vm-pip-control', VmPipControl);
    define$1('vm-playback-control', VmPlaybackControl);
    define$1('vm-scrim', VmScrim);
    define$1('vm-scrubber-control', VmScrubberControl);
    define$1('vm-slider', VmSlider);
    define$1('vm-settings-control', VmSettingsControl);
    define$1('vm-time-progress', VmTimeProgress);
    define$1('vm-volume-control', VmVolumeControl);
    define$1('vm-default-settings', VmDefaultSettings);
    define$1('vm-menu', VmMenu);
    define$1('vm-menu-item', VmMenuItem);
    define$1('vm-menu-radio', VmMenuRadio);
    define$1('vm-menu-radio-group', VmMenuRadioGroup);
    define$1('vm-settings', VmSettings);
    define$1('vm-submenu', VmSubmenu);
    define$1('vm-loading-screen', VmLoadingScreen);
    define$1('vm-poster', VmPoster);
    define$1('vm-spinner', VmSpinner);
    define$1('vm-ui', VmUi);

    /* node_modules/@vime/svelte/src/svelte/Embed.svelte generated by Svelte v3.44.2 */

    define$1('vm-embed', VmEmbed);

    /* node_modules/@vime/svelte/src/svelte/EndTime.svelte generated by Svelte v3.44.2 */

    define$1('vm-end-time', VmEndTime);
    define$1('vm-time', VmTime);

    /* node_modules/@vime/svelte/src/svelte/File.svelte generated by Svelte v3.44.2 */

    define$1('vm-file', VmFile);

    /* node_modules/@vime/svelte/src/svelte/FullscreenControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-fullscreen-control', VmFullscreenControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Hls.svelte generated by Svelte v3.44.2 */
    const file$p = "node_modules/@vime/svelte/src/svelte/Hls.svelte";

    function create_fragment$t(ctx) {
    	let vm_hls;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[20].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[19], null);

    	const block = {
    		c: function create() {
    			vm_hls = element("vm-hls");
    			if (default_slot) default_slot.c();
    			set_custom_element_data(vm_hls, "class", /*className*/ ctx[0]);
    			set_custom_element_data(vm_hls, "style", /*style*/ ctx[1]);
    			set_custom_element_data(vm_hls, "version", /*version*/ ctx[2]);
    			set_custom_element_data(vm_hls, "lib-src", /*libSrc*/ ctx[3]);
    			set_custom_element_data(vm_hls, "config", /*config*/ ctx[4]);
    			set_custom_element_data(vm_hls, "cross-origin", /*crossOrigin*/ ctx[5]);
    			set_custom_element_data(vm_hls, "preload", /*preload*/ ctx[6]);
    			set_custom_element_data(vm_hls, "poster", /*poster*/ ctx[7]);
    			set_custom_element_data(vm_hls, "controls-list", /*controlsList*/ ctx[8]);
    			set_custom_element_data(vm_hls, "auto-pip", /*autoPiP*/ ctx[9]);
    			set_custom_element_data(vm_hls, "disable-pip", /*disablePiP*/ ctx[10]);
    			set_custom_element_data(vm_hls, "disable-remote-playback", /*disableRemotePlayback*/ ctx[11]);
    			set_custom_element_data(vm_hls, "playback-ready", /*playbackReady*/ ctx[12]);
    			set_custom_element_data(vm_hls, "media-title", /*mediaTitle*/ ctx[13]);
    			add_location(vm_hls, file$p, 62, 0, 1171);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, vm_hls, anchor);

    			if (default_slot) {
    				default_slot.m(vm_hls, null);
    			}

    			/*vm_hls_binding*/ ctx[21](vm_hls);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(vm_hls, "vmLoadStart", /*onEvent*/ ctx[15], false, false, false),
    					listen_dev(vm_hls, "vmError", /*onEvent*/ ctx[15], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 524288)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[19],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[19])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[19], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*className*/ 1) {
    				set_custom_element_data(vm_hls, "class", /*className*/ ctx[0]);
    			}

    			if (!current || dirty & /*style*/ 2) {
    				set_custom_element_data(vm_hls, "style", /*style*/ ctx[1]);
    			}

    			if (!current || dirty & /*version*/ 4) {
    				set_custom_element_data(vm_hls, "version", /*version*/ ctx[2]);
    			}

    			if (!current || dirty & /*libSrc*/ 8) {
    				set_custom_element_data(vm_hls, "lib-src", /*libSrc*/ ctx[3]);
    			}

    			if (!current || dirty & /*config*/ 16) {
    				set_custom_element_data(vm_hls, "config", /*config*/ ctx[4]);
    			}

    			if (!current || dirty & /*crossOrigin*/ 32) {
    				set_custom_element_data(vm_hls, "cross-origin", /*crossOrigin*/ ctx[5]);
    			}

    			if (!current || dirty & /*preload*/ 64) {
    				set_custom_element_data(vm_hls, "preload", /*preload*/ ctx[6]);
    			}

    			if (!current || dirty & /*poster*/ 128) {
    				set_custom_element_data(vm_hls, "poster", /*poster*/ ctx[7]);
    			}

    			if (!current || dirty & /*controlsList*/ 256) {
    				set_custom_element_data(vm_hls, "controls-list", /*controlsList*/ ctx[8]);
    			}

    			if (!current || dirty & /*autoPiP*/ 512) {
    				set_custom_element_data(vm_hls, "auto-pip", /*autoPiP*/ ctx[9]);
    			}

    			if (!current || dirty & /*disablePiP*/ 1024) {
    				set_custom_element_data(vm_hls, "disable-pip", /*disablePiP*/ ctx[10]);
    			}

    			if (!current || dirty & /*disableRemotePlayback*/ 2048) {
    				set_custom_element_data(vm_hls, "disable-remote-playback", /*disableRemotePlayback*/ ctx[11]);
    			}

    			if (!current || dirty & /*playbackReady*/ 4096) {
    				set_custom_element_data(vm_hls, "playback-ready", /*playbackReady*/ ctx[12]);
    			}

    			if (!current || dirty & /*mediaTitle*/ 8192) {
    				set_custom_element_data(vm_hls, "media-title", /*mediaTitle*/ ctx[13]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(vm_hls);
    			if (default_slot) default_slot.d(detaching);
    			/*vm_hls_binding*/ ctx[21](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    define$1('vm-hls', VmHls);
    define$1('vm-file', VmFile);
    define$1('vm-video', VmVideo);

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hls', slots, ['default']);
    	let __ref;
    	let __mounted = false;
    	const dispatch = createEventDispatcher();
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { version = 'latest' } = $$props;
    	let { libSrc = undefined } = $$props;
    	let { config = undefined } = $$props;
    	let { crossOrigin = undefined } = $$props;
    	let { preload = 'metadata' } = $$props;
    	let { poster = undefined } = $$props;
    	let { controlsList = undefined } = $$props;
    	let { autoPiP = undefined } = $$props;
    	let { disablePiP = undefined } = $$props;
    	let { disableRemotePlayback = undefined } = $$props;
    	let { playbackReady = false } = $$props;
    	let { mediaTitle = undefined } = $$props;
    	const getAdapter = (...args) => __ref.getAdapter(...args);
    	const ref = () => __ref;
    	const getWebComponent = () => __ref;

    	onMount(() => {
    		__mounted = true;
    	});

    	const onEvent = e => {
    		e.stopPropagation();
    		dispatch(e.type, e.detail);
    	};

    	const writable_props = [
    		'class',
    		'style',
    		'version',
    		'libSrc',
    		'config',
    		'crossOrigin',
    		'preload',
    		'poster',
    		'controlsList',
    		'autoPiP',
    		'disablePiP',
    		'disableRemotePlayback',
    		'playbackReady',
    		'mediaTitle'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hls> was created with unknown prop '${key}'`);
    	});

    	function vm_hls_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			__ref = $$value;
    			$$invalidate(14, __ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, className = $$props.class);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('version' in $$props) $$invalidate(2, version = $$props.version);
    		if ('libSrc' in $$props) $$invalidate(3, libSrc = $$props.libSrc);
    		if ('config' in $$props) $$invalidate(4, config = $$props.config);
    		if ('crossOrigin' in $$props) $$invalidate(5, crossOrigin = $$props.crossOrigin);
    		if ('preload' in $$props) $$invalidate(6, preload = $$props.preload);
    		if ('poster' in $$props) $$invalidate(7, poster = $$props.poster);
    		if ('controlsList' in $$props) $$invalidate(8, controlsList = $$props.controlsList);
    		if ('autoPiP' in $$props) $$invalidate(9, autoPiP = $$props.autoPiP);
    		if ('disablePiP' in $$props) $$invalidate(10, disablePiP = $$props.disablePiP);
    		if ('disableRemotePlayback' in $$props) $$invalidate(11, disableRemotePlayback = $$props.disableRemotePlayback);
    		if ('playbackReady' in $$props) $$invalidate(12, playbackReady = $$props.playbackReady);
    		if ('mediaTitle' in $$props) $$invalidate(13, mediaTitle = $$props.mediaTitle);
    		if ('$$scope' in $$props) $$invalidate(19, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		VmHls,
    		VmFile,
    		VmVideo,
    		define: define$1,
    		createEventDispatcher,
    		onMount,
    		setProp,
    		__ref,
    		__mounted,
    		dispatch,
    		className,
    		style,
    		version,
    		libSrc,
    		config,
    		crossOrigin,
    		preload,
    		poster,
    		controlsList,
    		autoPiP,
    		disablePiP,
    		disableRemotePlayback,
    		playbackReady,
    		mediaTitle,
    		getAdapter,
    		ref,
    		getWebComponent,
    		onEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ('__ref' in $$props) $$invalidate(14, __ref = $$props.__ref);
    		if ('__mounted' in $$props) __mounted = $$props.__mounted;
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('version' in $$props) $$invalidate(2, version = $$props.version);
    		if ('libSrc' in $$props) $$invalidate(3, libSrc = $$props.libSrc);
    		if ('config' in $$props) $$invalidate(4, config = $$props.config);
    		if ('crossOrigin' in $$props) $$invalidate(5, crossOrigin = $$props.crossOrigin);
    		if ('preload' in $$props) $$invalidate(6, preload = $$props.preload);
    		if ('poster' in $$props) $$invalidate(7, poster = $$props.poster);
    		if ('controlsList' in $$props) $$invalidate(8, controlsList = $$props.controlsList);
    		if ('autoPiP' in $$props) $$invalidate(9, autoPiP = $$props.autoPiP);
    		if ('disablePiP' in $$props) $$invalidate(10, disablePiP = $$props.disablePiP);
    		if ('disableRemotePlayback' in $$props) $$invalidate(11, disableRemotePlayback = $$props.disableRemotePlayback);
    		if ('playbackReady' in $$props) $$invalidate(12, playbackReady = $$props.playbackReady);
    		if ('mediaTitle' in $$props) $$invalidate(13, mediaTitle = $$props.mediaTitle);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		className,
    		style,
    		version,
    		libSrc,
    		config,
    		crossOrigin,
    		preload,
    		poster,
    		controlsList,
    		autoPiP,
    		disablePiP,
    		disableRemotePlayback,
    		playbackReady,
    		mediaTitle,
    		__ref,
    		onEvent,
    		getAdapter,
    		ref,
    		getWebComponent,
    		$$scope,
    		slots,
    		vm_hls_binding
    	];
    }

    class Hls$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$t, create_fragment$t, safe_not_equal, {
    			class: 0,
    			style: 1,
    			version: 2,
    			libSrc: 3,
    			config: 4,
    			crossOrigin: 5,
    			preload: 6,
    			poster: 7,
    			controlsList: 8,
    			autoPiP: 9,
    			disablePiP: 10,
    			disableRemotePlayback: 11,
    			playbackReady: 12,
    			mediaTitle: 13,
    			getAdapter: 16,
    			ref: 17,
    			getWebComponent: 18
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hls",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get class() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get version() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set version(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get libSrc() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set libSrc(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get config() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set config(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get crossOrigin() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set crossOrigin(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get preload() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set preload(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get poster() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set poster(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get controlsList() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set controlsList(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoPiP() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoPiP(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disablePiP() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disablePiP(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disableRemotePlayback() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disableRemotePlayback(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackReady() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackReady(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mediaTitle() {
    		throw new Error("<Hls>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mediaTitle(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getAdapter() {
    		return this.$$.ctx[16];
    	}

    	set getAdapter(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		return this.$$.ctx[17];
    	}

    	set ref(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getWebComponent() {
    		return this.$$.ctx[18];
    	}

    	set getWebComponent(value) {
    		throw new Error("<Hls>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@vime/svelte/src/svelte/Icon.svelte generated by Svelte v3.44.2 */

    define$1('vm-icon', VmIcon);

    /* node_modules/@vime/svelte/src/svelte/IconLibrary.svelte generated by Svelte v3.44.2 */

    define$1('vm-icon-library', VmIconLibrary);

    /* node_modules/@vime/svelte/src/svelte/LiveIndicator.svelte generated by Svelte v3.44.2 */

    define$1('vm-live-indicator', VmLiveIndicator);

    /* node_modules/@vime/svelte/src/svelte/LoadingScreen.svelte generated by Svelte v3.44.2 */

    define$1('vm-loading-screen', VmLoadingScreen);

    /* node_modules/@vime/svelte/src/svelte/Menu.svelte generated by Svelte v3.44.2 */

    define$1('vm-menu', VmMenu);

    /* node_modules/@vime/svelte/src/svelte/MenuItem.svelte generated by Svelte v3.44.2 */

    define$1('vm-menu-item', VmMenuItem);
    define$1('vm-icon', VmIcon);

    /* node_modules/@vime/svelte/src/svelte/MenuRadio.svelte generated by Svelte v3.44.2 */

    define$1('vm-menu-radio', VmMenuRadio);
    define$1('vm-icon', VmIcon);
    define$1('vm-menu-item', VmMenuItem);

    /* node_modules/@vime/svelte/src/svelte/MenuRadioGroup.svelte generated by Svelte v3.44.2 */

    define$1('vm-menu-radio-group', VmMenuRadioGroup);

    /* node_modules/@vime/svelte/src/svelte/MuteControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-mute-control', VmMuteControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/PipControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-pip-control', VmPipControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/PlaybackControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-playback-control', VmPlaybackControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Player.svelte generated by Svelte v3.44.2 */
    const file$o = "node_modules/@vime/svelte/src/svelte/Player.svelte";

    function create_fragment$s(ctx) {
    	let vm_player;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[86].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[85], null);

    	const block = {
    		c: function create() {
    			vm_player = element("vm-player");
    			if (default_slot) default_slot.c();
    			set_custom_element_data(vm_player, "class", /*className*/ ctx[0]);
    			set_custom_element_data(vm_player, "style", /*style*/ ctx[1]);
    			set_custom_element_data(vm_player, "theme", /*theme*/ ctx[2]);
    			set_custom_element_data(vm_player, "icons", /*icons*/ ctx[3]);
    			set_custom_element_data(vm_player, "paused", /*paused*/ ctx[4]);
    			set_custom_element_data(vm_player, "playing", /*playing*/ ctx[5]);
    			set_custom_element_data(vm_player, "duration", /*duration*/ ctx[6]);
    			set_custom_element_data(vm_player, "media-title", /*mediaTitle*/ ctx[7]);
    			set_custom_element_data(vm_player, "current-provider", /*currentProvider*/ ctx[8]);
    			set_custom_element_data(vm_player, "current-src", /*currentSrc*/ ctx[9]);
    			set_custom_element_data(vm_player, "current-poster", /*currentPoster*/ ctx[10]);
    			set_custom_element_data(vm_player, "current-time", /*currentTime*/ ctx[11]);
    			set_custom_element_data(vm_player, "autoplay", /*autoplay*/ ctx[12]);
    			set_custom_element_data(vm_player, "ready", /*ready*/ ctx[13]);
    			set_custom_element_data(vm_player, "playback-ready", /*playbackReady*/ ctx[14]);
    			set_custom_element_data(vm_player, "loop", /*loop*/ ctx[15]);
    			set_custom_element_data(vm_player, "muted", /*muted*/ ctx[16]);
    			set_custom_element_data(vm_player, "buffered", /*buffered*/ ctx[17]);
    			set_custom_element_data(vm_player, "playback-rate", /*playbackRate*/ ctx[18]);
    			set_custom_element_data(vm_player, "playback-quality", /*playbackQuality*/ ctx[19]);
    			set_custom_element_data(vm_player, "seeking", /*seeking*/ ctx[20]);
    			set_custom_element_data(vm_player, "debug", /*debug*/ ctx[21]);
    			set_custom_element_data(vm_player, "playback-started", /*playbackStarted*/ ctx[22]);
    			set_custom_element_data(vm_player, "playback-ended", /*playbackEnded*/ ctx[23]);
    			set_custom_element_data(vm_player, "buffering", /*buffering*/ ctx[24]);
    			set_custom_element_data(vm_player, "controls", /*controls*/ ctx[25]);
    			set_custom_element_data(vm_player, "is-controls-active", /*isControlsActive*/ ctx[26]);
    			set_custom_element_data(vm_player, "is-settings-active", /*isSettingsActive*/ ctx[27]);
    			set_custom_element_data(vm_player, "volume", /*volume*/ ctx[28]);
    			set_custom_element_data(vm_player, "is-fullscreen-active", /*isFullscreenActive*/ ctx[29]);
    			set_custom_element_data(vm_player, "aspect-ratio", /*aspectRatio*/ ctx[30]);
    			set_custom_element_data(vm_player, "view-type", /*viewType*/ ctx[31]);
    			set_custom_element_data(vm_player, "is-audio-view", /*isAudioView*/ ctx[32]);
    			set_custom_element_data(vm_player, "is-video-view", /*isVideoView*/ ctx[33]);
    			set_custom_element_data(vm_player, "media-type", /*mediaType*/ ctx[34]);
    			set_custom_element_data(vm_player, "is-audio", /*isAudio*/ ctx[35]);
    			set_custom_element_data(vm_player, "is-video", /*isVideo*/ ctx[36]);
    			set_custom_element_data(vm_player, "is-live", /*isLive*/ ctx[37]);
    			set_custom_element_data(vm_player, "is-mobile", /*isMobile*/ ctx[38]);
    			set_custom_element_data(vm_player, "is-touch", /*isTouch*/ ctx[39]);
    			set_custom_element_data(vm_player, "is-pi-p-active", /*isPiPActive*/ ctx[40]);
    			set_custom_element_data(vm_player, "current-text-track", /*currentTextTrack*/ ctx[41]);
    			set_custom_element_data(vm_player, "is-text-track-visible", /*isTextTrackVisible*/ ctx[42]);
    			set_custom_element_data(vm_player, "should-render-native-text-tracks", /*shouldRenderNativeTextTracks*/ ctx[43]);
    			set_custom_element_data(vm_player, "current-audio-track", /*currentAudioTrack*/ ctx[44]);
    			set_custom_element_data(vm_player, "autopause", /*autopause*/ ctx[45]);
    			set_custom_element_data(vm_player, "playsinline", /*playsinline*/ ctx[46]);
    			set_custom_element_data(vm_player, "language", /*language*/ ctx[47]);
    			add_location(vm_player, file$o, 132, 0, 4753);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, vm_player, anchor);

    			if (default_slot) {
    				default_slot.m(vm_player, null);
    			}

    			/*vm_player_binding*/ ctx[87](vm_player);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(vm_player, "vmThemeChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPausedChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlay", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlayingChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmSeekingChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmSeeked", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmBufferingChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmDurationChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentTimeChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmReady", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackReady", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackStarted", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackEnded", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmBufferedChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmError", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmLoadStart", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentProviderChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentSrcChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentPosterChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmMediaTitleChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmControlsChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackRateChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackRatesChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackQualityChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPlaybackQualitiesChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmMutedChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmVolumeChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmViewTypeChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmMediaTypeChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmLiveChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmTouchChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmLanguageChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmI18nChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmTranslationsChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmLanguagesChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmFullscreenChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmPiPChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmTextTracksChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentTextTrackChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmTextTrackVisibleChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmAudioTracksChange", /*onEvent*/ ctx[49], false, false, false),
    					listen_dev(vm_player, "vmCurrentAudioTrackChange", /*onEvent*/ ctx[49], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[2] & /*$$scope*/ 8388608)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[85],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[85])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[85], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty[0] & /*className*/ 1) {
    				set_custom_element_data(vm_player, "class", /*className*/ ctx[0]);
    			}

    			if (!current || dirty[0] & /*style*/ 2) {
    				set_custom_element_data(vm_player, "style", /*style*/ ctx[1]);
    			}

    			if (!current || dirty[0] & /*theme*/ 4) {
    				set_custom_element_data(vm_player, "theme", /*theme*/ ctx[2]);
    			}

    			if (!current || dirty[0] & /*icons*/ 8) {
    				set_custom_element_data(vm_player, "icons", /*icons*/ ctx[3]);
    			}

    			if (!current || dirty[0] & /*paused*/ 16) {
    				set_custom_element_data(vm_player, "paused", /*paused*/ ctx[4]);
    			}

    			if (!current || dirty[0] & /*playing*/ 32) {
    				set_custom_element_data(vm_player, "playing", /*playing*/ ctx[5]);
    			}

    			if (!current || dirty[0] & /*duration*/ 64) {
    				set_custom_element_data(vm_player, "duration", /*duration*/ ctx[6]);
    			}

    			if (!current || dirty[0] & /*mediaTitle*/ 128) {
    				set_custom_element_data(vm_player, "media-title", /*mediaTitle*/ ctx[7]);
    			}

    			if (!current || dirty[0] & /*currentProvider*/ 256) {
    				set_custom_element_data(vm_player, "current-provider", /*currentProvider*/ ctx[8]);
    			}

    			if (!current || dirty[0] & /*currentSrc*/ 512) {
    				set_custom_element_data(vm_player, "current-src", /*currentSrc*/ ctx[9]);
    			}

    			if (!current || dirty[0] & /*currentPoster*/ 1024) {
    				set_custom_element_data(vm_player, "current-poster", /*currentPoster*/ ctx[10]);
    			}

    			if (!current || dirty[0] & /*currentTime*/ 2048) {
    				set_custom_element_data(vm_player, "current-time", /*currentTime*/ ctx[11]);
    			}

    			if (!current || dirty[0] & /*autoplay*/ 4096) {
    				set_custom_element_data(vm_player, "autoplay", /*autoplay*/ ctx[12]);
    			}

    			if (!current || dirty[0] & /*ready*/ 8192) {
    				set_custom_element_data(vm_player, "ready", /*ready*/ ctx[13]);
    			}

    			if (!current || dirty[0] & /*playbackReady*/ 16384) {
    				set_custom_element_data(vm_player, "playback-ready", /*playbackReady*/ ctx[14]);
    			}

    			if (!current || dirty[0] & /*loop*/ 32768) {
    				set_custom_element_data(vm_player, "loop", /*loop*/ ctx[15]);
    			}

    			if (!current || dirty[0] & /*muted*/ 65536) {
    				set_custom_element_data(vm_player, "muted", /*muted*/ ctx[16]);
    			}

    			if (!current || dirty[0] & /*buffered*/ 131072) {
    				set_custom_element_data(vm_player, "buffered", /*buffered*/ ctx[17]);
    			}

    			if (!current || dirty[0] & /*playbackRate*/ 262144) {
    				set_custom_element_data(vm_player, "playback-rate", /*playbackRate*/ ctx[18]);
    			}

    			if (!current || dirty[0] & /*playbackQuality*/ 524288) {
    				set_custom_element_data(vm_player, "playback-quality", /*playbackQuality*/ ctx[19]);
    			}

    			if (!current || dirty[0] & /*seeking*/ 1048576) {
    				set_custom_element_data(vm_player, "seeking", /*seeking*/ ctx[20]);
    			}

    			if (!current || dirty[0] & /*debug*/ 2097152) {
    				set_custom_element_data(vm_player, "debug", /*debug*/ ctx[21]);
    			}

    			if (!current || dirty[0] & /*playbackStarted*/ 4194304) {
    				set_custom_element_data(vm_player, "playback-started", /*playbackStarted*/ ctx[22]);
    			}

    			if (!current || dirty[0] & /*playbackEnded*/ 8388608) {
    				set_custom_element_data(vm_player, "playback-ended", /*playbackEnded*/ ctx[23]);
    			}

    			if (!current || dirty[0] & /*buffering*/ 16777216) {
    				set_custom_element_data(vm_player, "buffering", /*buffering*/ ctx[24]);
    			}

    			if (!current || dirty[0] & /*controls*/ 33554432) {
    				set_custom_element_data(vm_player, "controls", /*controls*/ ctx[25]);
    			}

    			if (!current || dirty[0] & /*isControlsActive*/ 67108864) {
    				set_custom_element_data(vm_player, "is-controls-active", /*isControlsActive*/ ctx[26]);
    			}

    			if (!current || dirty[0] & /*isSettingsActive*/ 134217728) {
    				set_custom_element_data(vm_player, "is-settings-active", /*isSettingsActive*/ ctx[27]);
    			}

    			if (!current || dirty[0] & /*volume*/ 268435456) {
    				set_custom_element_data(vm_player, "volume", /*volume*/ ctx[28]);
    			}

    			if (!current || dirty[0] & /*isFullscreenActive*/ 536870912) {
    				set_custom_element_data(vm_player, "is-fullscreen-active", /*isFullscreenActive*/ ctx[29]);
    			}

    			if (!current || dirty[0] & /*aspectRatio*/ 1073741824) {
    				set_custom_element_data(vm_player, "aspect-ratio", /*aspectRatio*/ ctx[30]);
    			}

    			if (!current || dirty[1] & /*viewType*/ 1) {
    				set_custom_element_data(vm_player, "view-type", /*viewType*/ ctx[31]);
    			}

    			if (!current || dirty[1] & /*isAudioView*/ 2) {
    				set_custom_element_data(vm_player, "is-audio-view", /*isAudioView*/ ctx[32]);
    			}

    			if (!current || dirty[1] & /*isVideoView*/ 4) {
    				set_custom_element_data(vm_player, "is-video-view", /*isVideoView*/ ctx[33]);
    			}

    			if (!current || dirty[1] & /*mediaType*/ 8) {
    				set_custom_element_data(vm_player, "media-type", /*mediaType*/ ctx[34]);
    			}

    			if (!current || dirty[1] & /*isAudio*/ 16) {
    				set_custom_element_data(vm_player, "is-audio", /*isAudio*/ ctx[35]);
    			}

    			if (!current || dirty[1] & /*isVideo*/ 32) {
    				set_custom_element_data(vm_player, "is-video", /*isVideo*/ ctx[36]);
    			}

    			if (!current || dirty[1] & /*isLive*/ 64) {
    				set_custom_element_data(vm_player, "is-live", /*isLive*/ ctx[37]);
    			}

    			if (!current || dirty[1] & /*isMobile*/ 128) {
    				set_custom_element_data(vm_player, "is-mobile", /*isMobile*/ ctx[38]);
    			}

    			if (!current || dirty[1] & /*isTouch*/ 256) {
    				set_custom_element_data(vm_player, "is-touch", /*isTouch*/ ctx[39]);
    			}

    			if (!current || dirty[1] & /*isPiPActive*/ 512) {
    				set_custom_element_data(vm_player, "is-pi-p-active", /*isPiPActive*/ ctx[40]);
    			}

    			if (!current || dirty[1] & /*currentTextTrack*/ 1024) {
    				set_custom_element_data(vm_player, "current-text-track", /*currentTextTrack*/ ctx[41]);
    			}

    			if (!current || dirty[1] & /*isTextTrackVisible*/ 2048) {
    				set_custom_element_data(vm_player, "is-text-track-visible", /*isTextTrackVisible*/ ctx[42]);
    			}

    			if (!current || dirty[1] & /*shouldRenderNativeTextTracks*/ 4096) {
    				set_custom_element_data(vm_player, "should-render-native-text-tracks", /*shouldRenderNativeTextTracks*/ ctx[43]);
    			}

    			if (!current || dirty[1] & /*currentAudioTrack*/ 8192) {
    				set_custom_element_data(vm_player, "current-audio-track", /*currentAudioTrack*/ ctx[44]);
    			}

    			if (!current || dirty[1] & /*autopause*/ 16384) {
    				set_custom_element_data(vm_player, "autopause", /*autopause*/ ctx[45]);
    			}

    			if (!current || dirty[1] & /*playsinline*/ 32768) {
    				set_custom_element_data(vm_player, "playsinline", /*playsinline*/ ctx[46]);
    			}

    			if (!current || dirty[1] & /*language*/ 65536) {
    				set_custom_element_data(vm_player, "language", /*language*/ ctx[47]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(vm_player);
    			if (default_slot) default_slot.d(detaching);
    			/*vm_player_binding*/ ctx[87](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    define$1('vm-player', VmPlayer);

    function instance$s($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Player', slots, ['default']);
    	let __ref;
    	let __mounted = false;
    	const dispatch = createEventDispatcher();
    	let { class: className = '' } = $$props;
    	let { style = '' } = $$props;
    	let { logger = undefined } = $$props;
    	let { theme = undefined } = $$props;
    	let { icons = 'vime' } = $$props;
    	let { paused = true } = $$props;
    	let { playing = false } = $$props;
    	let { duration = -1 } = $$props;
    	let { mediaTitle = undefined } = $$props;
    	let { currentProvider = undefined } = $$props;
    	let { currentSrc = undefined } = $$props;
    	let { currentPoster = undefined } = $$props;
    	let { currentTime = 0 } = $$props;
    	let { autoplay = false } = $$props;
    	let { ready = false } = $$props;
    	let { playbackReady = false } = $$props;
    	let { loop = false } = $$props;
    	let { muted = false } = $$props;
    	let { buffered = 0 } = $$props;
    	let { playbackRate = 1 } = $$props;
    	let { playbackRates = [1] } = $$props;
    	let { playbackQuality = undefined } = $$props;
    	let { playbackQualities = [] } = $$props;
    	let { seeking = false } = $$props;
    	let { debug = false } = $$props;
    	let { playbackStarted = false } = $$props;
    	let { playbackEnded = false } = $$props;
    	let { buffering = false } = $$props;
    	let { controls = false } = $$props;
    	let { isControlsActive = false } = $$props;
    	let { isSettingsActive = false } = $$props;
    	let { volume = 50 } = $$props;
    	let { isFullscreenActive = false } = $$props;
    	let { aspectRatio = '16:9' } = $$props;
    	let { viewType = undefined } = $$props;
    	let { isAudioView = false } = $$props;
    	let { isVideoView = false } = $$props;
    	let { mediaType = undefined } = $$props;
    	let { isAudio = false } = $$props;
    	let { isVideo = false } = $$props;
    	let { isLive = false } = $$props;
    	let { isMobile = false } = $$props;
    	let { isTouch = false } = $$props;
    	let { isPiPActive = false } = $$props;
    	let { textTracks = [] } = $$props;
    	let { currentTextTrack = -1 } = $$props;
    	let { isTextTrackVisible = true } = $$props;
    	let { shouldRenderNativeTextTracks = true } = $$props;
    	let { audioTracks = [] } = $$props;
    	let { currentAudioTrack = -1 } = $$props;
    	let { autopause = true } = $$props;
    	let { playsinline = false } = $$props;
    	let { language = 'en' } = $$props;
    	let { translations = undefined } = $$props;
    	let { languages = ['en'] } = $$props;
    	let { i18n = undefined } = $$props;
    	const getProvider = (...args) => __ref.getProvider(...args);
    	const getAdapter = (...args) => __ref.getAdapter(...args);
    	const play = (...args) => __ref.play(...args);
    	const pause = (...args) => __ref.pause(...args);
    	const canPlay = (...args) => __ref.canPlay(...args);
    	const canAutoplay = (...args) => __ref.canAutoplay(...args);
    	const canMutedAutoplay = (...args) => __ref.canMutedAutoplay(...args);
    	const canSetPlaybackRate = (...args) => __ref.canSetPlaybackRate(...args);
    	const canSetPlaybackQuality = (...args) => __ref.canSetPlaybackQuality(...args);
    	const canSetFullscreen = (...args) => __ref.canSetFullscreen(...args);
    	const enterFullscreen = (...args) => __ref.enterFullscreen(...args);
    	const exitFullscreen = (...args) => __ref.exitFullscreen(...args);
    	const canSetPiP = (...args) => __ref.canSetPiP(...args);
    	const enterPiP = (...args) => __ref.enterPiP(...args);
    	const exitPiP = (...args) => __ref.exitPiP(...args);
    	const canSetAudioTrack = (...args) => __ref.canSetAudioTrack(...args);
    	const setCurrentAudioTrack = (...args) => __ref.setCurrentAudioTrack(...args);
    	const canSetTextTrack = (...args) => __ref.canSetTextTrack(...args);
    	const setCurrentTextTrack = (...args) => __ref.setCurrentTextTrack(...args);
    	const canSetTextTrackVisibility = (...args) => __ref.canSetTextTrackVisibility(...args);
    	const setTextTrackVisibility = (...args) => __ref.setTextTrackVisibility(...args);
    	const extendLanguage = (...args) => __ref.extendLanguage(...args);
    	const getContainer = (...args) => __ref.getContainer(...args);
    	const callAdapter = (...args) => __ref.callAdapter(...args);
    	const ref = () => __ref;
    	const getWebComponent = () => __ref;

    	onMount(() => {
    		$$invalidate(50, logger = logger === void 0 ? __ref['logger'] : logger);

    		$$invalidate(51, translations = translations === void 0
    		? __ref['translations']
    		: translations);

    		$$invalidate(52, i18n = i18n === void 0 ? __ref['i18n'] : i18n);
    		$$invalidate(84, __mounted = true);
    	});

    	const onEvent = e => {
    		e.stopPropagation();
    		dispatch(e.type, e.detail);
    	};

    	const writable_props = [
    		'class',
    		'style',
    		'logger',
    		'theme',
    		'icons',
    		'paused',
    		'playing',
    		'duration',
    		'mediaTitle',
    		'currentProvider',
    		'currentSrc',
    		'currentPoster',
    		'currentTime',
    		'autoplay',
    		'ready',
    		'playbackReady',
    		'loop',
    		'muted',
    		'buffered',
    		'playbackRate',
    		'playbackRates',
    		'playbackQuality',
    		'playbackQualities',
    		'seeking',
    		'debug',
    		'playbackStarted',
    		'playbackEnded',
    		'buffering',
    		'controls',
    		'isControlsActive',
    		'isSettingsActive',
    		'volume',
    		'isFullscreenActive',
    		'aspectRatio',
    		'viewType',
    		'isAudioView',
    		'isVideoView',
    		'mediaType',
    		'isAudio',
    		'isVideo',
    		'isLive',
    		'isMobile',
    		'isTouch',
    		'isPiPActive',
    		'textTracks',
    		'currentTextTrack',
    		'isTextTrackVisible',
    		'shouldRenderNativeTextTracks',
    		'audioTracks',
    		'currentAudioTrack',
    		'autopause',
    		'playsinline',
    		'language',
    		'translations',
    		'languages',
    		'i18n'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Player> was created with unknown prop '${key}'`);
    	});

    	function vm_player_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			__ref = $$value;
    			$$invalidate(48, __ref);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('class' in $$props) $$invalidate(0, className = $$props.class);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('logger' in $$props) $$invalidate(50, logger = $$props.logger);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    		if ('icons' in $$props) $$invalidate(3, icons = $$props.icons);
    		if ('paused' in $$props) $$invalidate(4, paused = $$props.paused);
    		if ('playing' in $$props) $$invalidate(5, playing = $$props.playing);
    		if ('duration' in $$props) $$invalidate(6, duration = $$props.duration);
    		if ('mediaTitle' in $$props) $$invalidate(7, mediaTitle = $$props.mediaTitle);
    		if ('currentProvider' in $$props) $$invalidate(8, currentProvider = $$props.currentProvider);
    		if ('currentSrc' in $$props) $$invalidate(9, currentSrc = $$props.currentSrc);
    		if ('currentPoster' in $$props) $$invalidate(10, currentPoster = $$props.currentPoster);
    		if ('currentTime' in $$props) $$invalidate(11, currentTime = $$props.currentTime);
    		if ('autoplay' in $$props) $$invalidate(12, autoplay = $$props.autoplay);
    		if ('ready' in $$props) $$invalidate(13, ready = $$props.ready);
    		if ('playbackReady' in $$props) $$invalidate(14, playbackReady = $$props.playbackReady);
    		if ('loop' in $$props) $$invalidate(15, loop = $$props.loop);
    		if ('muted' in $$props) $$invalidate(16, muted = $$props.muted);
    		if ('buffered' in $$props) $$invalidate(17, buffered = $$props.buffered);
    		if ('playbackRate' in $$props) $$invalidate(18, playbackRate = $$props.playbackRate);
    		if ('playbackRates' in $$props) $$invalidate(53, playbackRates = $$props.playbackRates);
    		if ('playbackQuality' in $$props) $$invalidate(19, playbackQuality = $$props.playbackQuality);
    		if ('playbackQualities' in $$props) $$invalidate(54, playbackQualities = $$props.playbackQualities);
    		if ('seeking' in $$props) $$invalidate(20, seeking = $$props.seeking);
    		if ('debug' in $$props) $$invalidate(21, debug = $$props.debug);
    		if ('playbackStarted' in $$props) $$invalidate(22, playbackStarted = $$props.playbackStarted);
    		if ('playbackEnded' in $$props) $$invalidate(23, playbackEnded = $$props.playbackEnded);
    		if ('buffering' in $$props) $$invalidate(24, buffering = $$props.buffering);
    		if ('controls' in $$props) $$invalidate(25, controls = $$props.controls);
    		if ('isControlsActive' in $$props) $$invalidate(26, isControlsActive = $$props.isControlsActive);
    		if ('isSettingsActive' in $$props) $$invalidate(27, isSettingsActive = $$props.isSettingsActive);
    		if ('volume' in $$props) $$invalidate(28, volume = $$props.volume);
    		if ('isFullscreenActive' in $$props) $$invalidate(29, isFullscreenActive = $$props.isFullscreenActive);
    		if ('aspectRatio' in $$props) $$invalidate(30, aspectRatio = $$props.aspectRatio);
    		if ('viewType' in $$props) $$invalidate(31, viewType = $$props.viewType);
    		if ('isAudioView' in $$props) $$invalidate(32, isAudioView = $$props.isAudioView);
    		if ('isVideoView' in $$props) $$invalidate(33, isVideoView = $$props.isVideoView);
    		if ('mediaType' in $$props) $$invalidate(34, mediaType = $$props.mediaType);
    		if ('isAudio' in $$props) $$invalidate(35, isAudio = $$props.isAudio);
    		if ('isVideo' in $$props) $$invalidate(36, isVideo = $$props.isVideo);
    		if ('isLive' in $$props) $$invalidate(37, isLive = $$props.isLive);
    		if ('isMobile' in $$props) $$invalidate(38, isMobile = $$props.isMobile);
    		if ('isTouch' in $$props) $$invalidate(39, isTouch = $$props.isTouch);
    		if ('isPiPActive' in $$props) $$invalidate(40, isPiPActive = $$props.isPiPActive);
    		if ('textTracks' in $$props) $$invalidate(55, textTracks = $$props.textTracks);
    		if ('currentTextTrack' in $$props) $$invalidate(41, currentTextTrack = $$props.currentTextTrack);
    		if ('isTextTrackVisible' in $$props) $$invalidate(42, isTextTrackVisible = $$props.isTextTrackVisible);
    		if ('shouldRenderNativeTextTracks' in $$props) $$invalidate(43, shouldRenderNativeTextTracks = $$props.shouldRenderNativeTextTracks);
    		if ('audioTracks' in $$props) $$invalidate(56, audioTracks = $$props.audioTracks);
    		if ('currentAudioTrack' in $$props) $$invalidate(44, currentAudioTrack = $$props.currentAudioTrack);
    		if ('autopause' in $$props) $$invalidate(45, autopause = $$props.autopause);
    		if ('playsinline' in $$props) $$invalidate(46, playsinline = $$props.playsinline);
    		if ('language' in $$props) $$invalidate(47, language = $$props.language);
    		if ('translations' in $$props) $$invalidate(51, translations = $$props.translations);
    		if ('languages' in $$props) $$invalidate(57, languages = $$props.languages);
    		if ('i18n' in $$props) $$invalidate(52, i18n = $$props.i18n);
    		if ('$$scope' in $$props) $$invalidate(85, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		VmPlayer,
    		define: define$1,
    		createEventDispatcher,
    		onMount,
    		setProp,
    		__ref,
    		__mounted,
    		dispatch,
    		className,
    		style,
    		logger,
    		theme,
    		icons,
    		paused,
    		playing,
    		duration,
    		mediaTitle,
    		currentProvider,
    		currentSrc,
    		currentPoster,
    		currentTime,
    		autoplay,
    		ready,
    		playbackReady,
    		loop,
    		muted,
    		buffered,
    		playbackRate,
    		playbackRates,
    		playbackQuality,
    		playbackQualities,
    		seeking,
    		debug,
    		playbackStarted,
    		playbackEnded,
    		buffering,
    		controls,
    		isControlsActive,
    		isSettingsActive,
    		volume,
    		isFullscreenActive,
    		aspectRatio,
    		viewType,
    		isAudioView,
    		isVideoView,
    		mediaType,
    		isAudio,
    		isVideo,
    		isLive,
    		isMobile,
    		isTouch,
    		isPiPActive,
    		textTracks,
    		currentTextTrack,
    		isTextTrackVisible,
    		shouldRenderNativeTextTracks,
    		audioTracks,
    		currentAudioTrack,
    		autopause,
    		playsinline,
    		language,
    		translations,
    		languages,
    		i18n,
    		getProvider,
    		getAdapter,
    		play,
    		pause,
    		canPlay,
    		canAutoplay,
    		canMutedAutoplay,
    		canSetPlaybackRate,
    		canSetPlaybackQuality,
    		canSetFullscreen,
    		enterFullscreen,
    		exitFullscreen,
    		canSetPiP,
    		enterPiP,
    		exitPiP,
    		canSetAudioTrack,
    		setCurrentAudioTrack,
    		canSetTextTrack,
    		setCurrentTextTrack,
    		canSetTextTrackVisibility,
    		setTextTrackVisibility,
    		extendLanguage,
    		getContainer,
    		callAdapter,
    		ref,
    		getWebComponent,
    		onEvent
    	});

    	$$self.$inject_state = $$props => {
    		if ('__ref' in $$props) $$invalidate(48, __ref = $$props.__ref);
    		if ('__mounted' in $$props) $$invalidate(84, __mounted = $$props.__mounted);
    		if ('className' in $$props) $$invalidate(0, className = $$props.className);
    		if ('style' in $$props) $$invalidate(1, style = $$props.style);
    		if ('logger' in $$props) $$invalidate(50, logger = $$props.logger);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    		if ('icons' in $$props) $$invalidate(3, icons = $$props.icons);
    		if ('paused' in $$props) $$invalidate(4, paused = $$props.paused);
    		if ('playing' in $$props) $$invalidate(5, playing = $$props.playing);
    		if ('duration' in $$props) $$invalidate(6, duration = $$props.duration);
    		if ('mediaTitle' in $$props) $$invalidate(7, mediaTitle = $$props.mediaTitle);
    		if ('currentProvider' in $$props) $$invalidate(8, currentProvider = $$props.currentProvider);
    		if ('currentSrc' in $$props) $$invalidate(9, currentSrc = $$props.currentSrc);
    		if ('currentPoster' in $$props) $$invalidate(10, currentPoster = $$props.currentPoster);
    		if ('currentTime' in $$props) $$invalidate(11, currentTime = $$props.currentTime);
    		if ('autoplay' in $$props) $$invalidate(12, autoplay = $$props.autoplay);
    		if ('ready' in $$props) $$invalidate(13, ready = $$props.ready);
    		if ('playbackReady' in $$props) $$invalidate(14, playbackReady = $$props.playbackReady);
    		if ('loop' in $$props) $$invalidate(15, loop = $$props.loop);
    		if ('muted' in $$props) $$invalidate(16, muted = $$props.muted);
    		if ('buffered' in $$props) $$invalidate(17, buffered = $$props.buffered);
    		if ('playbackRate' in $$props) $$invalidate(18, playbackRate = $$props.playbackRate);
    		if ('playbackRates' in $$props) $$invalidate(53, playbackRates = $$props.playbackRates);
    		if ('playbackQuality' in $$props) $$invalidate(19, playbackQuality = $$props.playbackQuality);
    		if ('playbackQualities' in $$props) $$invalidate(54, playbackQualities = $$props.playbackQualities);
    		if ('seeking' in $$props) $$invalidate(20, seeking = $$props.seeking);
    		if ('debug' in $$props) $$invalidate(21, debug = $$props.debug);
    		if ('playbackStarted' in $$props) $$invalidate(22, playbackStarted = $$props.playbackStarted);
    		if ('playbackEnded' in $$props) $$invalidate(23, playbackEnded = $$props.playbackEnded);
    		if ('buffering' in $$props) $$invalidate(24, buffering = $$props.buffering);
    		if ('controls' in $$props) $$invalidate(25, controls = $$props.controls);
    		if ('isControlsActive' in $$props) $$invalidate(26, isControlsActive = $$props.isControlsActive);
    		if ('isSettingsActive' in $$props) $$invalidate(27, isSettingsActive = $$props.isSettingsActive);
    		if ('volume' in $$props) $$invalidate(28, volume = $$props.volume);
    		if ('isFullscreenActive' in $$props) $$invalidate(29, isFullscreenActive = $$props.isFullscreenActive);
    		if ('aspectRatio' in $$props) $$invalidate(30, aspectRatio = $$props.aspectRatio);
    		if ('viewType' in $$props) $$invalidate(31, viewType = $$props.viewType);
    		if ('isAudioView' in $$props) $$invalidate(32, isAudioView = $$props.isAudioView);
    		if ('isVideoView' in $$props) $$invalidate(33, isVideoView = $$props.isVideoView);
    		if ('mediaType' in $$props) $$invalidate(34, mediaType = $$props.mediaType);
    		if ('isAudio' in $$props) $$invalidate(35, isAudio = $$props.isAudio);
    		if ('isVideo' in $$props) $$invalidate(36, isVideo = $$props.isVideo);
    		if ('isLive' in $$props) $$invalidate(37, isLive = $$props.isLive);
    		if ('isMobile' in $$props) $$invalidate(38, isMobile = $$props.isMobile);
    		if ('isTouch' in $$props) $$invalidate(39, isTouch = $$props.isTouch);
    		if ('isPiPActive' in $$props) $$invalidate(40, isPiPActive = $$props.isPiPActive);
    		if ('textTracks' in $$props) $$invalidate(55, textTracks = $$props.textTracks);
    		if ('currentTextTrack' in $$props) $$invalidate(41, currentTextTrack = $$props.currentTextTrack);
    		if ('isTextTrackVisible' in $$props) $$invalidate(42, isTextTrackVisible = $$props.isTextTrackVisible);
    		if ('shouldRenderNativeTextTracks' in $$props) $$invalidate(43, shouldRenderNativeTextTracks = $$props.shouldRenderNativeTextTracks);
    		if ('audioTracks' in $$props) $$invalidate(56, audioTracks = $$props.audioTracks);
    		if ('currentAudioTrack' in $$props) $$invalidate(44, currentAudioTrack = $$props.currentAudioTrack);
    		if ('autopause' in $$props) $$invalidate(45, autopause = $$props.autopause);
    		if ('playsinline' in $$props) $$invalidate(46, playsinline = $$props.playsinline);
    		if ('language' in $$props) $$invalidate(47, language = $$props.language);
    		if ('translations' in $$props) $$invalidate(51, translations = $$props.translations);
    		if ('languages' in $$props) $$invalidate(57, languages = $$props.languages);
    		if ('i18n' in $$props) $$invalidate(52, i18n = $$props.i18n);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[1] & /*__ref, logger*/ 655360 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'logger', logger);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, playbackRates*/ 4325376 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'playbackRates', playbackRates);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, playbackQualities*/ 8519680 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'playbackQualities', playbackQualities);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, textTracks*/ 16908288 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'textTracks', textTracks);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, audioTracks*/ 33685504 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'audioTracks', audioTracks);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, translations*/ 1179648 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'translations', translations);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, languages*/ 67239936 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'languages', languages);
    		}

    		if ($$self.$$.dirty[1] & /*__ref, i18n*/ 2228224 | $$self.$$.dirty[2] & /*__mounted*/ 4194304) {
    			if (__mounted) setProp(__ref, 'i18n', i18n);
    		}
    	};

    	return [
    		className,
    		style,
    		theme,
    		icons,
    		paused,
    		playing,
    		duration,
    		mediaTitle,
    		currentProvider,
    		currentSrc,
    		currentPoster,
    		currentTime,
    		autoplay,
    		ready,
    		playbackReady,
    		loop,
    		muted,
    		buffered,
    		playbackRate,
    		playbackQuality,
    		seeking,
    		debug,
    		playbackStarted,
    		playbackEnded,
    		buffering,
    		controls,
    		isControlsActive,
    		isSettingsActive,
    		volume,
    		isFullscreenActive,
    		aspectRatio,
    		viewType,
    		isAudioView,
    		isVideoView,
    		mediaType,
    		isAudio,
    		isVideo,
    		isLive,
    		isMobile,
    		isTouch,
    		isPiPActive,
    		currentTextTrack,
    		isTextTrackVisible,
    		shouldRenderNativeTextTracks,
    		currentAudioTrack,
    		autopause,
    		playsinline,
    		language,
    		__ref,
    		onEvent,
    		logger,
    		translations,
    		i18n,
    		playbackRates,
    		playbackQualities,
    		textTracks,
    		audioTracks,
    		languages,
    		getProvider,
    		getAdapter,
    		play,
    		pause,
    		canPlay,
    		canAutoplay,
    		canMutedAutoplay,
    		canSetPlaybackRate,
    		canSetPlaybackQuality,
    		canSetFullscreen,
    		enterFullscreen,
    		exitFullscreen,
    		canSetPiP,
    		enterPiP,
    		exitPiP,
    		canSetAudioTrack,
    		setCurrentAudioTrack,
    		canSetTextTrack,
    		setCurrentTextTrack,
    		canSetTextTrackVisibility,
    		setTextTrackVisibility,
    		extendLanguage,
    		getContainer,
    		callAdapter,
    		ref,
    		getWebComponent,
    		__mounted,
    		$$scope,
    		slots,
    		vm_player_binding
    	];
    }

    class Player$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(
    			this,
    			options,
    			instance$s,
    			create_fragment$s,
    			safe_not_equal,
    			{
    				class: 0,
    				style: 1,
    				logger: 50,
    				theme: 2,
    				icons: 3,
    				paused: 4,
    				playing: 5,
    				duration: 6,
    				mediaTitle: 7,
    				currentProvider: 8,
    				currentSrc: 9,
    				currentPoster: 10,
    				currentTime: 11,
    				autoplay: 12,
    				ready: 13,
    				playbackReady: 14,
    				loop: 15,
    				muted: 16,
    				buffered: 17,
    				playbackRate: 18,
    				playbackRates: 53,
    				playbackQuality: 19,
    				playbackQualities: 54,
    				seeking: 20,
    				debug: 21,
    				playbackStarted: 22,
    				playbackEnded: 23,
    				buffering: 24,
    				controls: 25,
    				isControlsActive: 26,
    				isSettingsActive: 27,
    				volume: 28,
    				isFullscreenActive: 29,
    				aspectRatio: 30,
    				viewType: 31,
    				isAudioView: 32,
    				isVideoView: 33,
    				mediaType: 34,
    				isAudio: 35,
    				isVideo: 36,
    				isLive: 37,
    				isMobile: 38,
    				isTouch: 39,
    				isPiPActive: 40,
    				textTracks: 55,
    				currentTextTrack: 41,
    				isTextTrackVisible: 42,
    				shouldRenderNativeTextTracks: 43,
    				audioTracks: 56,
    				currentAudioTrack: 44,
    				autopause: 45,
    				playsinline: 46,
    				language: 47,
    				translations: 51,
    				languages: 57,
    				i18n: 52,
    				getProvider: 58,
    				getAdapter: 59,
    				play: 60,
    				pause: 61,
    				canPlay: 62,
    				canAutoplay: 63,
    				canMutedAutoplay: 64,
    				canSetPlaybackRate: 65,
    				canSetPlaybackQuality: 66,
    				canSetFullscreen: 67,
    				enterFullscreen: 68,
    				exitFullscreen: 69,
    				canSetPiP: 70,
    				enterPiP: 71,
    				exitPiP: 72,
    				canSetAudioTrack: 73,
    				setCurrentAudioTrack: 74,
    				canSetTextTrack: 75,
    				setCurrentTextTrack: 76,
    				canSetTextTrackVisibility: 77,
    				setTextTrackVisibility: 78,
    				extendLanguage: 79,
    				getContainer: 80,
    				callAdapter: 81,
    				ref: 82,
    				getWebComponent: 83
    			},
    			null,
    			[-1, -1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Player",
    			options,
    			id: create_fragment$s.name
    		});
    	}

    	get class() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set class(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get logger() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set logger(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icons() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icons(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get paused() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set paused(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playing() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playing(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get duration() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mediaTitle() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mediaTitle(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentProvider() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentProvider(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentSrc() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentSrc(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentPoster() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentPoster(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentTime() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentTime(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autoplay() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autoplay(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ready() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ready(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackReady() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackReady(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get loop() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set loop(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get muted() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set muted(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get buffered() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buffered(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackRate() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackRate(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackRates() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackRates(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackQuality() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackQuality(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackQualities() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackQualities(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get seeking() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set seeking(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get debug() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set debug(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackStarted() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackStarted(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playbackEnded() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playbackEnded(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get buffering() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set buffering(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get controls() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set controls(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isControlsActive() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isControlsActive(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isSettingsActive() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isSettingsActive(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get volume() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set volume(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isFullscreenActive() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isFullscreenActive(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get aspectRatio() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set aspectRatio(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewType() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewType(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isAudioView() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isAudioView(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isVideoView() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isVideoView(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get mediaType() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set mediaType(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isAudio() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isAudio(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isVideo() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isVideo(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isLive() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isLive(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isMobile() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isMobile(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isTouch() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTouch(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isPiPActive() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isPiPActive(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get textTracks() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set textTracks(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentTextTrack() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentTextTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isTextTrackVisible() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isTextTrackVisible(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shouldRenderNativeTextTracks() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shouldRenderNativeTextTracks(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get audioTracks() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set audioTracks(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get currentAudioTrack() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set currentAudioTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get autopause() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set autopause(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get playsinline() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set playsinline(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get language() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set language(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get translations() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set translations(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get languages() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set languages(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get i18n() {
    		throw new Error("<Player>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set i18n(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProvider() {
    		return this.$$.ctx[58];
    	}

    	set getProvider(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getAdapter() {
    		return this.$$.ctx[59];
    	}

    	set getAdapter(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get play() {
    		return this.$$.ctx[60];
    	}

    	set play(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pause() {
    		return this.$$.ctx[61];
    	}

    	set pause(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canPlay() {
    		return this.$$.ctx[62];
    	}

    	set canPlay(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canAutoplay() {
    		return this.$$.ctx[63];
    	}

    	set canAutoplay(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canMutedAutoplay() {
    		return this.$$.ctx[64];
    	}

    	set canMutedAutoplay(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetPlaybackRate() {
    		return this.$$.ctx[65];
    	}

    	set canSetPlaybackRate(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetPlaybackQuality() {
    		return this.$$.ctx[66];
    	}

    	set canSetPlaybackQuality(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetFullscreen() {
    		return this.$$.ctx[67];
    	}

    	set canSetFullscreen(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enterFullscreen() {
    		return this.$$.ctx[68];
    	}

    	set enterFullscreen(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get exitFullscreen() {
    		return this.$$.ctx[69];
    	}

    	set exitFullscreen(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetPiP() {
    		return this.$$.ctx[70];
    	}

    	set canSetPiP(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get enterPiP() {
    		return this.$$.ctx[71];
    	}

    	set enterPiP(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get exitPiP() {
    		return this.$$.ctx[72];
    	}

    	set exitPiP(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetAudioTrack() {
    		return this.$$.ctx[73];
    	}

    	set canSetAudioTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setCurrentAudioTrack() {
    		return this.$$.ctx[74];
    	}

    	set setCurrentAudioTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetTextTrack() {
    		return this.$$.ctx[75];
    	}

    	set canSetTextTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setCurrentTextTrack() {
    		return this.$$.ctx[76];
    	}

    	set setCurrentTextTrack(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get canSetTextTrackVisibility() {
    		return this.$$.ctx[77];
    	}

    	set canSetTextTrackVisibility(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get setTextTrackVisibility() {
    		return this.$$.ctx[78];
    	}

    	set setTextTrackVisibility(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get extendLanguage() {
    		return this.$$.ctx[79];
    	}

    	set extendLanguage(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getContainer() {
    		return this.$$.ctx[80];
    	}

    	set getContainer(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get callAdapter() {
    		return this.$$.ctx[81];
    	}

    	set callAdapter(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		return this.$$.ctx[82];
    	}

    	set ref(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getWebComponent() {
    		return this.$$.ctx[83];
    	}

    	set getWebComponent(value) {
    		throw new Error("<Player>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/@vime/svelte/src/svelte/Poster.svelte generated by Svelte v3.44.2 */

    define$1('vm-poster', VmPoster);

    /* node_modules/@vime/svelte/src/svelte/Scrim.svelte generated by Svelte v3.44.2 */

    define$1('vm-scrim', VmScrim);

    /* node_modules/@vime/svelte/src/svelte/ScrubberControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-scrubber-control', VmScrubberControl);
    define$1('vm-slider', VmSlider);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Settings.svelte generated by Svelte v3.44.2 */

    define$1('vm-settings', VmSettings);
    define$1('vm-menu', VmMenu);

    /* node_modules/@vime/svelte/src/svelte/SettingsControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-settings-control', VmSettingsControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Skeleton.svelte generated by Svelte v3.44.2 */

    define$1('vm-skeleton', VmSkeleton);

    /* node_modules/@vime/svelte/src/svelte/Slider.svelte generated by Svelte v3.44.2 */

    define$1('vm-slider', VmSlider);

    /* node_modules/@vime/svelte/src/svelte/Spinner.svelte generated by Svelte v3.44.2 */

    define$1('vm-spinner', VmSpinner);

    /* node_modules/@vime/svelte/src/svelte/Submenu.svelte generated by Svelte v3.44.2 */

    define$1('vm-submenu', VmSubmenu);
    define$1('vm-icon', VmIcon);
    define$1('vm-menu', VmMenu);
    define$1('vm-menu-item', VmMenuItem);

    /* node_modules/@vime/svelte/src/svelte/Time.svelte generated by Svelte v3.44.2 */

    define$1('vm-time', VmTime);

    /* node_modules/@vime/svelte/src/svelte/TimeProgress.svelte generated by Svelte v3.44.2 */

    define$1('vm-time-progress', VmTimeProgress);
    define$1('vm-current-time', VmCurrentTime);
    define$1('vm-time', VmTime);
    define$1('vm-end-time', VmEndTime);

    /* node_modules/@vime/svelte/src/svelte/Tooltip.svelte generated by Svelte v3.44.2 */

    define$1('vm-tooltip', VmTooltip);

    /* node_modules/@vime/svelte/src/svelte/Ui.svelte generated by Svelte v3.44.2 */

    define$1('vm-ui', VmUi);

    /* node_modules/@vime/svelte/src/svelte/Video.svelte generated by Svelte v3.44.2 */

    define$1('vm-video', VmVideo);
    define$1('vm-file', VmFile);

    /* node_modules/@vime/svelte/src/svelte/Vimeo.svelte generated by Svelte v3.44.2 */

    define$1('vm-vimeo', VmVimeo);
    define$1('vm-embed', VmEmbed);

    /* node_modules/@vime/svelte/src/svelte/VolumeControl.svelte generated by Svelte v3.44.2 */

    define$1('vm-volume-control', VmVolumeControl);
    define$1('vm-control', VmControl);
    define$1('vm-icon', VmIcon);
    define$1('vm-mute-control', VmMuteControl);
    define$1('vm-tooltip', VmTooltip);
    define$1('vm-slider', VmSlider);

    /* node_modules/@vime/svelte/src/svelte/Youtube.svelte generated by Svelte v3.44.2 */

    define$1('vm-youtube', VmYoutube);
    define$1('vm-embed', VmEmbed);

    /* eslint-disable */
    const Hls = Hls$1;
    const Player = Player$1;

    const define = (tagName, clazz) => {
        const isClient = typeof window !== 'undefined';
        if (isClient && !customElements.get(tagName))
            customElements.define(tagName, clazz);
    };

    /* generated by Svelte v3.44.2 */
    define('vm-audio', VmAudio);
    define('vm-file', VmFile);

    /* generated by Svelte v3.44.2 */
    define('vm-caption-control', VmCaptionControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-captions', VmCaptions);

    /* generated by Svelte v3.44.2 */
    define('vm-click-to-play', VmClickToPlay);

    /* generated by Svelte v3.44.2 */
    define('vm-control', VmControl);

    /* generated by Svelte v3.44.2 */
    define('vm-control-group', VmControlGroup);

    /* generated by Svelte v3.44.2 */
    define('vm-control-spacer', VmControlSpacer);

    /* generated by Svelte v3.44.2 */
    define('vm-controls', VmControls);

    /* generated by Svelte v3.44.2 */
    define('vm-current-time', VmCurrentTime);
    define('vm-time', VmTime);

    /* generated by Svelte v3.44.2 */
    define('vm-dailymotion', VmDailymotion);
    define('vm-embed', VmEmbed);

    /* generated by Svelte v3.44.2 */
    define('vm-dash', VmDash);
    define('vm-file', VmFile);
    define('vm-video', VmVideo);

    /* generated by Svelte v3.44.2 */
    define('vm-dbl-click-fullscreen', VmDblClickFullscreen);

    /* generated by Svelte v3.44.2 */
    define('vm-default-controls', VmDefaultControls);
    define('vm-caption-control', VmCaptionControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);
    define('vm-control-group', VmControlGroup);
    define('vm-control-spacer', VmControlSpacer);
    define('vm-controls', VmControls);
    define('vm-current-time', VmCurrentTime);
    define('vm-time', VmTime);
    define('vm-end-time', VmEndTime);
    define('vm-fullscreen-control', VmFullscreenControl);
    define('vm-live-indicator', VmLiveIndicator);
    define('vm-mute-control', VmMuteControl);
    define('vm-pip-control', VmPipControl);
    define('vm-playback-control', VmPlaybackControl);
    define('vm-scrim', VmScrim);
    define('vm-scrubber-control', VmScrubberControl);
    define('vm-slider', VmSlider);
    define('vm-settings-control', VmSettingsControl);
    define('vm-time-progress', VmTimeProgress);
    define('vm-volume-control', VmVolumeControl);

    /* generated by Svelte v3.44.2 */
    define('vm-default-settings', VmDefaultSettings);
    define('vm-icon', VmIcon);
    define('vm-menu', VmMenu);
    define('vm-menu-item', VmMenuItem);
    define('vm-menu-radio', VmMenuRadio);
    define('vm-menu-radio-group', VmMenuRadioGroup);
    define('vm-settings', VmSettings);
    define('vm-submenu', VmSubmenu);

    /* generated by Svelte v3.44.2 */
    define('vm-default-ui', VmDefaultUi);
    define('vm-caption-control', VmCaptionControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);
    define('vm-captions', VmCaptions);
    define('vm-click-to-play', VmClickToPlay);
    define('vm-control-group', VmControlGroup);
    define('vm-control-spacer', VmControlSpacer);
    define('vm-controls', VmControls);
    define('vm-current-time', VmCurrentTime);
    define('vm-time', VmTime);
    define('vm-dbl-click-fullscreen', VmDblClickFullscreen);
    define('vm-default-controls', VmDefaultControls);
    define('vm-end-time', VmEndTime);
    define('vm-fullscreen-control', VmFullscreenControl);
    define('vm-live-indicator', VmLiveIndicator);
    define('vm-mute-control', VmMuteControl);
    define('vm-pip-control', VmPipControl);
    define('vm-playback-control', VmPlaybackControl);
    define('vm-scrim', VmScrim);
    define('vm-scrubber-control', VmScrubberControl);
    define('vm-slider', VmSlider);
    define('vm-settings-control', VmSettingsControl);
    define('vm-time-progress', VmTimeProgress);
    define('vm-volume-control', VmVolumeControl);
    define('vm-default-settings', VmDefaultSettings);
    define('vm-menu', VmMenu);
    define('vm-menu-item', VmMenuItem);
    define('vm-menu-radio', VmMenuRadio);
    define('vm-menu-radio-group', VmMenuRadioGroup);
    define('vm-settings', VmSettings);
    define('vm-submenu', VmSubmenu);
    define('vm-loading-screen', VmLoadingScreen);
    define('vm-poster', VmPoster);
    define('vm-spinner', VmSpinner);
    define('vm-ui', VmUi);

    /* generated by Svelte v3.44.2 */
    define('vm-embed', VmEmbed);

    /* generated by Svelte v3.44.2 */
    define('vm-end-time', VmEndTime);
    define('vm-time', VmTime);

    /* generated by Svelte v3.44.2 */
    define('vm-file', VmFile);

    /* generated by Svelte v3.44.2 */
    define('vm-fullscreen-control', VmFullscreenControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-hls', VmHls);
    define('vm-file', VmFile);
    define('vm-video', VmVideo);

    /* generated by Svelte v3.44.2 */
    define('vm-icon', VmIcon);

    /* generated by Svelte v3.44.2 */
    define('vm-icon-library', VmIconLibrary);

    /* generated by Svelte v3.44.2 */
    define('vm-live-indicator', VmLiveIndicator);

    /* generated by Svelte v3.44.2 */
    define('vm-loading-screen', VmLoadingScreen);

    /* generated by Svelte v3.44.2 */
    define('vm-menu', VmMenu);

    /* generated by Svelte v3.44.2 */
    define('vm-menu-item', VmMenuItem);
    define('vm-icon', VmIcon);

    /* generated by Svelte v3.44.2 */
    define('vm-menu-radio', VmMenuRadio);
    define('vm-icon', VmIcon);
    define('vm-menu-item', VmMenuItem);

    /* generated by Svelte v3.44.2 */
    define('vm-menu-radio-group', VmMenuRadioGroup);

    /* generated by Svelte v3.44.2 */
    define('vm-mute-control', VmMuteControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-pip-control', VmPipControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-playback-control', VmPlaybackControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-player', VmPlayer);

    /* generated by Svelte v3.44.2 */
    define('vm-poster', VmPoster);

    /* generated by Svelte v3.44.2 */
    define('vm-scrim', VmScrim);

    /* generated by Svelte v3.44.2 */
    define('vm-scrubber-control', VmScrubberControl);
    define('vm-slider', VmSlider);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-settings', VmSettings);
    define('vm-menu', VmMenu);

    /* generated by Svelte v3.44.2 */
    define('vm-settings-control', VmSettingsControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-skeleton', VmSkeleton);

    /* generated by Svelte v3.44.2 */
    define('vm-slider', VmSlider);

    /* generated by Svelte v3.44.2 */
    define('vm-spinner', VmSpinner);

    /* generated by Svelte v3.44.2 */
    define('vm-submenu', VmSubmenu);
    define('vm-icon', VmIcon);
    define('vm-menu', VmMenu);
    define('vm-menu-item', VmMenuItem);

    /* generated by Svelte v3.44.2 */
    define('vm-time', VmTime);

    /* generated by Svelte v3.44.2 */
    define('vm-time-progress', VmTimeProgress);
    define('vm-current-time', VmCurrentTime);
    define('vm-time', VmTime);
    define('vm-end-time', VmEndTime);

    /* generated by Svelte v3.44.2 */
    define('vm-tooltip', VmTooltip);

    /* generated by Svelte v3.44.2 */
    define('vm-ui', VmUi);

    /* generated by Svelte v3.44.2 */
    define('vm-video', VmVideo);
    define('vm-file', VmFile);

    /* generated by Svelte v3.44.2 */
    define('vm-vimeo', VmVimeo);
    define('vm-embed', VmEmbed);

    /* generated by Svelte v3.44.2 */
    define('vm-volume-control', VmVolumeControl);
    define('vm-control', VmControl);
    define('vm-icon', VmIcon);
    define('vm-mute-control', VmMuteControl);
    define('vm-tooltip', VmTooltip);
    define('vm-slider', VmSlider);

    /* generated by Svelte v3.44.2 */
    define('vm-youtube', VmYoutube);
    define('vm-embed', VmEmbed);

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    /* src/pages/Live.svelte generated by Svelte v3.44.2 */
    const file$n = "src/pages/Live.svelte";

    // (8:8) <Hls version="latest" config="{hlsConfig}" poster="/media/poster.png">
    function create_default_slot_1$2(ctx) {
    	let source;

    	const block = {
    		c: function create() {
    			source = element("source");
    			attr_dev(source, "data-src", "https://live.webtv.international/hls/test.m3u8");
    			attr_dev(source, "type", "application/x-mpegURL");
    			add_location(source, file$n, 8, 10, 215);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, source, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(source);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(8:8) <Hls version=\\\"latest\\\" config=\\\"{hlsConfig}\\\" poster=\\\"/media/poster.png\\\">",
    		ctx
    	});

    	return block;
    }

    // (7:4) <Player controls>
    function create_default_slot$2(ctx) {
    	let hls;
    	let current;

    	hls = new Hls({
    			props: {
    				version: "latest",
    				config: /*hlsConfig*/ ctx[0],
    				poster: "/media/poster.png",
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(hls.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(hls, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const hls_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				hls_changes.$$scope = { dirty, ctx };
    			}

    			hls.$set(hls_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hls.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hls.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(hls, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(7:4) <Player controls>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$r(ctx) {
    	let article;
    	let player;
    	let current;

    	player = new Player({
    			props: {
    				controls: true,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			article = element("article");
    			create_component(player.$$.fragment);
    			add_location(article, file$n, 5, 0, 94);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			mount_component(player, article, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const player_changes = {};

    			if (dirty & /*$$scope*/ 2) {
    				player_changes.$$scope = { dirty, ctx };
    			}

    			player.$set(player_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(player.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(player.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_component(player);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Live', slots, []);
    	const hlsConfig = {};
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Live> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Player, Hls, hlsConfig });
    	return [hlsConfig];
    }

    class Live extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$r, create_fragment$r, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Live",
    			options,
    			id: create_fragment$r.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/Parser.svelte generated by Svelte v3.44.2 */

    function get_each_context_5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[15] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context_3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (13:2) {#if renderers[type]}
    function create_if_block_1$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2$1, create_if_block_3$1, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*type*/ ctx[0] === 'table') return 0;
    		if (/*type*/ ctx[0] === 'list') return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(13:2) {#if renderers[type]}",
    		ctx
    	});

    	return block;
    }

    // (8:0) {#if !type}
    function create_if_block$5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*tokens*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*tokens, renderers*/ 10) {
    				each_value = /*tokens*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(8:0) {#if !type}",
    		ctx
    	});

    	return block;
    }

    // (63:4) {:else}
    function create_else_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*$$restProps*/ ctx[4]];
    	var switch_value = /*renderers*/ ctx[3][/*type*/ ctx[0]];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_11] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 16)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*$$restProps*/ ctx[4])])
    			: {};

    			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 1048602) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3][/*type*/ ctx[0]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(63:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (45:30) 
    function create_if_block_3$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_4$1, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*ordered*/ ctx[2]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3$1.name,
    		type: "if",
    		source: "(45:30) ",
    		ctx
    	});

    	return block;
    }

    // (14:4) {#if type === 'table'}
    function create_if_block_2$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].table;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, renderers, tokens, $$restProps*/ 1048602) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].table)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(14:4) {#if type === 'table'}",
    		ctx
    	});

    	return block;
    }

    // (67:8) {:else}
    function create_else_block_2(ctx) {
    	let t_value = /*$$restProps*/ ctx[4].raw + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$$restProps*/ 16 && t_value !== (t_value = /*$$restProps*/ ctx[4].raw + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_2.name,
    		type: "else",
    		source: "(67:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (65:8) {#if tokens}
    function create_if_block_5$1(ctx) {
    	let parser;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*tokens*/ ctx[1],
    				renderers: /*renderers*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 2) parser_changes.tokens = /*tokens*/ ctx[1];
    			if (dirty & /*renderers*/ 8) parser_changes.renderers = /*renderers*/ ctx[3];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5$1.name,
    		type: "if",
    		source: "(65:8) {#if tokens}",
    		ctx
    	});

    	return block;
    }

    // (64:6) <svelte:component this={renderers[type]} {...$$restProps}>
    function create_default_slot_11(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_5$1, create_else_block_2];
    	const if_blocks = [];

    	function select_block_type_3(ctx, dirty) {
    		if (/*tokens*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type_3(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_3(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_11.name,
    		type: "slot",
    		source: "(64:6) <svelte:component this={renderers[type]} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (54:6) {:else}
    function create_else_block$5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[2] }, /*$$restProps*/ ctx[4]];
    	var switch_value = /*renderers*/ ctx[3].list;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_9] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 20)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*ordered*/ 4 && { ordered: /*ordered*/ ctx[2] },
    					dirty & /*$$restProps*/ 16 && get_spread_object(/*$$restProps*/ ctx[4])
    				])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 1048600) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].list)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(54:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (46:6) {#if ordered}
    function create_if_block_4$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [{ ordered: /*ordered*/ ctx[2] }, /*$$restProps*/ ctx[4]];
    	var switch_value = /*renderers*/ ctx[3].list;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_7] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*ordered, $$restProps*/ 20)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*ordered*/ 4 && { ordered: /*ordered*/ ctx[2] },
    					dirty & /*$$restProps*/ 16 && get_spread_object(/*$$restProps*/ ctx[4])
    				])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 1048600) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].list)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4$1.name,
    		type: "if",
    		source: "(46:6) {#if ordered}",
    		ctx
    	});

    	return block;
    }

    // (57:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>
    function create_default_slot_10(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*item*/ ctx[15].tokens,
    				renderers: /*renderers*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*$$restProps*/ 16) parser_changes.tokens = /*item*/ ctx[15].tokens;
    			if (dirty & /*renderers*/ 8) parser_changes.renderers = /*renderers*/ ctx[3];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_10.name,
    		type: "slot",
    		source: "(57:12) <svelte:component this={renderers.unorderedlistitem || renderers.listitem} {...item}>",
    		ctx
    	});

    	return block;
    }

    // (56:10) {#each $$restProps.items as item}
    function create_each_block_5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*item*/ ctx[15]];
    	var switch_value = /*renderers*/ ctx[3].unorderedlistitem || /*renderers*/ ctx[3].listitem;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_10] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 16)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[15])])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 1048600) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].unorderedlistitem || /*renderers*/ ctx[3].listitem)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_5.name,
    		type: "each",
    		source: "(56:10) {#each $$restProps.items as item}",
    		ctx
    	});

    	return block;
    }

    // (55:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
    function create_default_slot_9(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_5 = /*$$restProps*/ ctx[4].items;
    	validate_each_argument(each_value_5);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_5.length; i += 1) {
    		each_blocks[i] = create_each_block_5(get_each_context_5(ctx, each_value_5, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps*/ 24) {
    				each_value_5 = /*$$restProps*/ ctx[4].items;
    				validate_each_argument(each_value_5);
    				let i;

    				for (i = 0; i < each_value_5.length; i += 1) {
    					const child_ctx = get_each_context_5(ctx, each_value_5, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_5.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_5.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(55:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (49:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>
    function create_default_slot_8(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*item*/ ctx[15].tokens,
    				renderers: /*renderers*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*$$restProps*/ 16) parser_changes.tokens = /*item*/ ctx[15].tokens;
    			if (dirty & /*renderers*/ 8) parser_changes.renderers = /*renderers*/ ctx[3];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(49:12) <svelte:component this={renderers.orderedlistitem || renderers.listitem} {...item}>",
    		ctx
    	});

    	return block;
    }

    // (48:10) {#each $$restProps.items as item}
    function create_each_block_4(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	const switch_instance_spread_levels = [/*item*/ ctx[15]];
    	var switch_value = /*renderers*/ ctx[3].orderedlistitem || /*renderers*/ ctx[3].listitem;

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			$$slots: { default: [create_default_slot_8] },
    			$$scope: { ctx }
    		};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$$restProps*/ 16)
    			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*item*/ ctx[15])])
    			: {};

    			if (dirty & /*$$scope, $$restProps, renderers*/ 1048600) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].orderedlistitem || /*renderers*/ ctx[3].listitem)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_4.name,
    		type: "each",
    		source: "(48:10) {#each $$restProps.items as item}",
    		ctx
    	});

    	return block;
    }

    // (47:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>
    function create_default_slot_7(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_4 = /*$$restProps*/ ctx[4].items;
    	validate_each_argument(each_value_4);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_4.length; i += 1) {
    		each_blocks[i] = create_each_block_4(get_each_context_4(ctx, each_value_4, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps*/ 24) {
    				each_value_4 = /*$$restProps*/ ctx[4].items;
    				validate_each_argument(each_value_4);
    				let i;

    				for (i = 0; i < each_value_4.length; i += 1) {
    					const child_ctx = get_each_context_4(ctx, each_value_4, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_4.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_4.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(47:8) <svelte:component this={renderers.list} {ordered} {...$$restProps}>",
    		ctx
    	});

    	return block;
    }

    // (19:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >
    function create_default_slot_6(ctx) {
    	let parser;
    	let t;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*cells*/ ctx[11],
    				renderers: /*renderers*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 2) parser_changes.tokens = /*cells*/ ctx[11];
    			if (dirty & /*renderers*/ 8) parser_changes.renderers = /*renderers*/ ctx[3];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(19:14) <svelte:component                 this={renderers.tablecell}                 header={true}                 align={$$restProps.align[i] || 'center'}                 >",
    		ctx
    	});

    	return block;
    }

    // (18:12) {#each tokens.header as cells, i}
    function create_each_block_3(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].tablecell;

    	function switch_props(ctx) {
    		return {
    			props: {
    				header: true,
    				align: /*$$restProps*/ ctx[4].align[/*i*/ ctx[13]] || 'center',
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*$$restProps*/ 16) switch_instance_changes.align = /*$$restProps*/ ctx[4].align[/*i*/ ctx[13]] || 'center';

    			if (dirty & /*$$scope, tokens, renderers*/ 1048586) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].tablecell)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_3.name,
    		type: "each",
    		source: "(18:12) {#each tokens.header as cells, i}",
    		ctx
    	});

    	return block;
    }

    // (17:10) <svelte:component this={renderers.tablerow}>
    function create_default_slot_5(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_3 = /*tokens*/ ctx[1].header;
    	validate_each_argument(each_value_3);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_3.length; i += 1) {
    		each_blocks[i] = create_each_block_3(get_each_context_3(ctx, each_value_3, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps, tokens*/ 26) {
    				each_value_3 = /*tokens*/ ctx[1].header;
    				validate_each_argument(each_value_3);
    				let i;

    				for (i = 0; i < each_value_3.length; i += 1) {
    					const child_ctx = get_each_context_3(ctx, each_value_3, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_3.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_3.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(17:10) <svelte:component this={renderers.tablerow}>",
    		ctx
    	});

    	return block;
    }

    // (16:8) <svelte:component this={renderers.tablehead}>
    function create_default_slot_4$1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].tablerow;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 1048602) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].tablerow)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4$1.name,
    		type: "slot",
    		source: "(16:8) <svelte:component this={renderers.tablehead}>",
    		ctx
    	});

    	return block;
    }

    // (33:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >
    function create_default_slot_3$1(ctx) {
    	let parser;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*cells*/ ctx[11],
    				renderers: /*renderers*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 2) parser_changes.tokens = /*cells*/ ctx[11];
    			if (dirty & /*renderers*/ 8) parser_changes.renderers = /*renderers*/ ctx[3];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(33:16) <svelte:component                   this={renderers.tablecell}                   header={false}                   align={$$restProps.align[i] || 'center'}                   >",
    		ctx
    	});

    	return block;
    }

    // (32:14) {#each row as cells, i}
    function create_each_block_2(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].tablecell;

    	function switch_props(ctx) {
    		return {
    			props: {
    				header: false,
    				align: /*$$restProps*/ ctx[4].align[/*i*/ ctx[13]] || 'center',
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};
    			if (dirty & /*$$restProps*/ 16) switch_instance_changes.align = /*$$restProps*/ ctx[4].align[/*i*/ ctx[13]] || 'center';

    			if (dirty & /*$$scope, tokens, renderers*/ 1048586) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].tablecell)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(32:14) {#each row as cells, i}",
    		ctx
    	});

    	return block;
    }

    // (31:12) <svelte:component this={renderers.tablerow}>
    function create_default_slot_2$1(ctx) {
    	let t;
    	let current;
    	let each_value_2 = /*row*/ ctx[8];
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, $$restProps, tokens*/ 26) {
    				each_value_2 = /*row*/ ctx[8];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(t.parentNode, t);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(31:12) <svelte:component this={renderers.tablerow}>",
    		ctx
    	});

    	return block;
    }

    // (30:10) {#each tokens.cells as row}
    function create_each_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].tablerow;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = {};

    			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 1048602) {
    				switch_instance_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].tablerow)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(30:10) {#each tokens.cells as row}",
    		ctx
    	});

    	return block;
    }

    // (29:8) <svelte:component this={renderers.tablebody}>
    function create_default_slot_1$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*tokens*/ ctx[1].cells;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*renderers, tokens, $$restProps*/ 26) {
    				each_value_1 = /*tokens*/ ctx[1].cells;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(29:8) <svelte:component this={renderers.tablebody}>",
    		ctx
    	});

    	return block;
    }

    // (15:6) <svelte:component this={renderers.table}>
    function create_default_slot$1(ctx) {
    	let switch_instance0;
    	let t;
    	let switch_instance1;
    	let switch_instance1_anchor;
    	let current;
    	var switch_value = /*renderers*/ ctx[3].tablehead;

    	function switch_props(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_4$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance0 = new switch_value(switch_props(ctx));
    	}

    	var switch_value_1 = /*renderers*/ ctx[3].tablebody;

    	function switch_props_1(ctx) {
    		return {
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		};
    	}

    	if (switch_value_1) {
    		switch_instance1 = new switch_value_1(switch_props_1(ctx));
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance0) create_component(switch_instance0.$$.fragment);
    			t = space();
    			if (switch_instance1) create_component(switch_instance1.$$.fragment);
    			switch_instance1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance0) {
    				mount_component(switch_instance0, target, anchor);
    			}

    			insert_dev(target, t, anchor);

    			if (switch_instance1) {
    				mount_component(switch_instance1, target, anchor);
    			}

    			insert_dev(target, switch_instance1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance0_changes = {};

    			if (dirty & /*$$scope, renderers, tokens, $$restProps*/ 1048602) {
    				switch_instance0_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value !== (switch_value = /*renderers*/ ctx[3].tablehead)) {
    				if (switch_instance0) {
    					group_outros();
    					const old_component = switch_instance0;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance0 = new switch_value(switch_props(ctx));
    					create_component(switch_instance0.$$.fragment);
    					transition_in(switch_instance0.$$.fragment, 1);
    					mount_component(switch_instance0, t.parentNode, t);
    				} else {
    					switch_instance0 = null;
    				}
    			} else if (switch_value) {
    				switch_instance0.$set(switch_instance0_changes);
    			}

    			const switch_instance1_changes = {};

    			if (dirty & /*$$scope, tokens, renderers, $$restProps*/ 1048602) {
    				switch_instance1_changes.$$scope = { dirty, ctx };
    			}

    			if (switch_value_1 !== (switch_value_1 = /*renderers*/ ctx[3].tablebody)) {
    				if (switch_instance1) {
    					group_outros();
    					const old_component = switch_instance1;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value_1) {
    					switch_instance1 = new switch_value_1(switch_props_1(ctx));
    					create_component(switch_instance1.$$.fragment);
    					transition_in(switch_instance1.$$.fragment, 1);
    					mount_component(switch_instance1, switch_instance1_anchor.parentNode, switch_instance1_anchor);
    				} else {
    					switch_instance1 = null;
    				}
    			} else if (switch_value_1) {
    				switch_instance1.$set(switch_instance1_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance0) transition_in(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_in(switch_instance1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance0) transition_out(switch_instance0.$$.fragment, local);
    			if (switch_instance1) transition_out(switch_instance1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (switch_instance0) destroy_component(switch_instance0, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(switch_instance1_anchor);
    			if (switch_instance1) destroy_component(switch_instance1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(15:6) <svelte:component this={renderers.table}>",
    		ctx
    	});

    	return block;
    }

    // (9:2) {#each tokens as token}
    function create_each_block(ctx) {
    	let parser;
    	let current;
    	const parser_spread_levels = [/*token*/ ctx[5], { renderers: /*renderers*/ ctx[3] }];
    	let parser_props = {};

    	for (let i = 0; i < parser_spread_levels.length; i += 1) {
    		parser_props = assign(parser_props, parser_spread_levels[i]);
    	}

    	parser = new Parser$1({ props: parser_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parser_changes = (dirty & /*tokens, renderers*/ 10)
    			? get_spread_update(parser_spread_levels, [
    					dirty & /*tokens*/ 2 && get_spread_object(/*token*/ ctx[5]),
    					dirty & /*renderers*/ 8 && { renderers: /*renderers*/ ctx[3] }
    				])
    			: {};

    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(9:2) {#each tokens as token}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$5, create_if_block_1$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (!/*type*/ ctx[0]) return 0;
    		if (/*renderers*/ ctx[3][/*type*/ ctx[0]]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(target, anchor);
    			}

    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block = if_blocks[current_block_type_index];

    					if (!if_block) {
    						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block.c();
    					} else {
    						if_block.p(ctx, dirty);
    					}

    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				} else {
    					if_block = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	const omit_props_names = ["type","tokens","ordered","renderers"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Parser', slots, []);
    	let { type = undefined } = $$props;
    	let { tokens = undefined } = $$props;
    	let { ordered = false } = $$props;
    	let { renderers } = $$props;

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(4, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('type' in $$new_props) $$invalidate(0, type = $$new_props.type);
    		if ('tokens' in $$new_props) $$invalidate(1, tokens = $$new_props.tokens);
    		if ('ordered' in $$new_props) $$invalidate(2, ordered = $$new_props.ordered);
    		if ('renderers' in $$new_props) $$invalidate(3, renderers = $$new_props.renderers);
    	};

    	$$self.$capture_state = () => ({ type, tokens, ordered, renderers });

    	$$self.$inject_state = $$new_props => {
    		if ('type' in $$props) $$invalidate(0, type = $$new_props.type);
    		if ('tokens' in $$props) $$invalidate(1, tokens = $$new_props.tokens);
    		if ('ordered' in $$props) $$invalidate(2, ordered = $$new_props.ordered);
    		if ('renderers' in $$props) $$invalidate(3, renderers = $$new_props.renderers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [type, tokens, ordered, renderers, $$restProps];
    }

    class Parser$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$q, create_fragment$q, safe_not_equal, {
    			type: 0,
    			tokens: 1,
    			ordered: 2,
    			renderers: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Parser",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*renderers*/ ctx[3] === undefined && !('renderers' in props)) {
    			console.warn("<Parser> was created without expected prop 'renderers'");
    		}
    	}

    	get type() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tokens() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tokens(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ordered() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ordered(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get renderers() {
    		throw new Error("<Parser>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set renderers(value) {
    		throw new Error("<Parser>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * marked - a markdown parser
     * Copyright (c) 2011-2021, Christopher Jeffrey. (MIT Licensed)
     * https://github.com/markedjs/marked
     */

    /**
     * DO NOT EDIT THIS FILE
     * The code in this file is generated from files in ./src/
     */

    var defaults$5 = {exports: {}};

    function getDefaults$1() {
      return {
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerIds: true,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: true,
        pedantic: false,
        renderer: null,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartLists: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
      };
    }

    function changeDefaults$1(newDefaults) {
      defaults$5.exports.defaults = newDefaults;
    }

    defaults$5.exports = {
      defaults: getDefaults$1(),
      getDefaults: getDefaults$1,
      changeDefaults: changeDefaults$1
    };

    /**
     * Helpers
     */

    const escapeTest = /[&<>"']/;
    const escapeReplace = /[&<>"']/g;
    const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
    const escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
    const escapeReplacements = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    const getEscapeReplacement = (ch) => escapeReplacements[ch];
    function escape$3(html, encode) {
      if (encode) {
        if (escapeTest.test(html)) {
          return html.replace(escapeReplace, getEscapeReplacement);
        }
      } else {
        if (escapeTestNoEncode.test(html)) {
          return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
        }
      }

      return html;
    }

    const unescapeTest = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig;

    function unescape$1(html) {
      // explicitly match decimal, hex, and named HTML entities
      return html.replace(unescapeTest, (_, n) => {
        n = n.toLowerCase();
        if (n === 'colon') return ':';
        if (n.charAt(0) === '#') {
          return n.charAt(1) === 'x'
            ? String.fromCharCode(parseInt(n.substring(2), 16))
            : String.fromCharCode(+n.substring(1));
        }
        return '';
      });
    }

    const caret = /(^|[^\[])\^/g;
    function edit$1(regex, opt) {
      regex = regex.source || regex;
      opt = opt || '';
      const obj = {
        replace: (name, val) => {
          val = val.source || val;
          val = val.replace(caret, '$1');
          regex = regex.replace(name, val);
          return obj;
        },
        getRegex: () => {
          return new RegExp(regex, opt);
        }
      };
      return obj;
    }

    const nonWordAndColonTest = /[^\w:]/g;
    const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function cleanUrl$1(sanitize, base, href) {
      if (sanitize) {
        let prot;
        try {
          prot = decodeURIComponent(unescape$1(href))
            .replace(nonWordAndColonTest, '')
            .toLowerCase();
        } catch (e) {
          return null;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
          return null;
        }
      }
      if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
      }
      try {
        href = encodeURI(href).replace(/%25/g, '%');
      } catch (e) {
        return null;
      }
      return href;
    }

    const baseUrls = {};
    const justDomain = /^[^:]+:\/*[^/]*$/;
    const protocol = /^([^:]+:)[\s\S]*$/;
    const domain = /^([^:]+:\/*[^/]*)[\s\S]*$/;

    function resolveUrl(base, href) {
      if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (justDomain.test(base)) {
          baseUrls[' ' + base] = base + '/';
        } else {
          baseUrls[' ' + base] = rtrim$1(base, '/', true);
        }
      }
      base = baseUrls[' ' + base];
      const relativeBase = base.indexOf(':') === -1;

      if (href.substring(0, 2) === '//') {
        if (relativeBase) {
          return href;
        }
        return base.replace(protocol, '$1') + href;
      } else if (href.charAt(0) === '/') {
        if (relativeBase) {
          return href;
        }
        return base.replace(domain, '$1') + href;
      } else {
        return base + href;
      }
    }

    const noopTest$1 = { exec: function noopTest() {} };

    function merge$2(obj) {
      let i = 1,
        target,
        key;

      for (; i < arguments.length; i++) {
        target = arguments[i];
        for (key in target) {
          if (Object.prototype.hasOwnProperty.call(target, key)) {
            obj[key] = target[key];
          }
        }
      }

      return obj;
    }

    function splitCells$1(tableRow, count) {
      // ensure that every cell-delimiting pipe has a space
      // before it to distinguish it from an escaped pipe
      const row = tableRow.replace(/\|/g, (match, offset, str) => {
          let escaped = false,
            curr = offset;
          while (--curr >= 0 && str[curr] === '\\') escaped = !escaped;
          if (escaped) {
            // odd number of slashes means | is escaped
            // so we leave it alone
            return '|';
          } else {
            // add space before unescaped |
            return ' |';
          }
        }),
        cells = row.split(/ \|/);
      let i = 0;

      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push('');
      }

      for (; i < cells.length; i++) {
        // leading or trailing whitespace is ignored per the gfm spec
        cells[i] = cells[i].trim().replace(/\\\|/g, '|');
      }
      return cells;
    }

    // Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
    // /c*$/ is vulnerable to REDOS.
    // invert: Remove suffix of non-c chars instead. Default falsey.
    function rtrim$1(str, c, invert) {
      const l = str.length;
      if (l === 0) {
        return '';
      }

      // Length of suffix matching the invert condition.
      let suffLen = 0;

      // Step left until we fail to match the invert condition.
      while (suffLen < l) {
        const currChar = str.charAt(l - suffLen - 1);
        if (currChar === c && !invert) {
          suffLen++;
        } else if (currChar !== c && invert) {
          suffLen++;
        } else {
          break;
        }
      }

      return str.substr(0, l - suffLen);
    }

    function findClosingBracket$1(str, b) {
      if (str.indexOf(b[1]) === -1) {
        return -1;
      }
      const l = str.length;
      let level = 0,
        i = 0;
      for (; i < l; i++) {
        if (str[i] === '\\') {
          i++;
        } else if (str[i] === b[0]) {
          level++;
        } else if (str[i] === b[1]) {
          level--;
          if (level < 0) {
            return i;
          }
        }
      }
      return -1;
    }

    function checkSanitizeDeprecation$1(opt) {
      if (opt && opt.sanitize && !opt.silent) {
        console.warn('marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options');
      }
    }

    // copied from https://stackoverflow.com/a/5450113/806777
    function repeatString$1(pattern, count) {
      if (count < 1) {
        return '';
      }
      let result = '';
      while (count > 1) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern += pattern;
      }
      return result + pattern;
    }

    var helpers = {
      escape: escape$3,
      unescape: unescape$1,
      edit: edit$1,
      cleanUrl: cleanUrl$1,
      resolveUrl,
      noopTest: noopTest$1,
      merge: merge$2,
      splitCells: splitCells$1,
      rtrim: rtrim$1,
      findClosingBracket: findClosingBracket$1,
      checkSanitizeDeprecation: checkSanitizeDeprecation$1,
      repeatString: repeatString$1
    };

    const { defaults: defaults$4 } = defaults$5.exports;
    const {
      rtrim,
      splitCells,
      escape: escape$2,
      findClosingBracket
    } = helpers;

    function outputLink(cap, link, raw) {
      const href = link.href;
      const title = link.title ? escape$2(link.title) : null;
      const text = cap[1].replace(/\\([\[\]])/g, '$1');

      if (cap[0].charAt(0) !== '!') {
        return {
          type: 'link',
          raw,
          href,
          title,
          text
        };
      } else {
        return {
          type: 'image',
          raw,
          href,
          title,
          text: escape$2(text)
        };
      }
    }

    function indentCodeCompensation(raw, text) {
      const matchIndentToCode = raw.match(/^(\s+)(?:```)/);

      if (matchIndentToCode === null) {
        return text;
      }

      const indentToCode = matchIndentToCode[1];

      return text
        .split('\n')
        .map(node => {
          const matchIndentInNode = node.match(/^\s+/);
          if (matchIndentInNode === null) {
            return node;
          }

          const [indentInNode] = matchIndentInNode;

          if (indentInNode.length >= indentToCode.length) {
            return node.slice(indentToCode.length);
          }

          return node;
        })
        .join('\n');
    }

    /**
     * Tokenizer
     */
    var Tokenizer_1 = class Tokenizer {
      constructor(options) {
        this.options = options || defaults$4;
      }

      space(src) {
        const cap = this.rules.block.newline.exec(src);
        if (cap) {
          if (cap[0].length > 1) {
            return {
              type: 'space',
              raw: cap[0]
            };
          }
          return { raw: '\n' };
        }
      }

      code(src) {
        const cap = this.rules.block.code.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ {1,4}/gm, '');
          return {
            type: 'code',
            raw: cap[0],
            codeBlockStyle: 'indented',
            text: !this.options.pedantic
              ? rtrim(text, '\n')
              : text
          };
        }
      }

      fences(src) {
        const cap = this.rules.block.fences.exec(src);
        if (cap) {
          const raw = cap[0];
          const text = indentCodeCompensation(raw, cap[3] || '');

          return {
            type: 'code',
            raw,
            lang: cap[2] ? cap[2].trim() : cap[2],
            text
          };
        }
      }

      heading(src) {
        const cap = this.rules.block.heading.exec(src);
        if (cap) {
          let text = cap[2].trim();

          // remove trailing #s
          if (/#$/.test(text)) {
            const trimmed = rtrim(text, '#');
            if (this.options.pedantic) {
              text = trimmed.trim();
            } else if (!trimmed || / $/.test(trimmed)) {
              // CommonMark requires space before trailing #s
              text = trimmed.trim();
            }
          }

          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[1].length,
            text: text
          };
        }
      }

      nptable(src) {
        const cap = this.rules.block.nptable.exec(src);
        if (cap) {
          const item = {
            type: 'table',
            header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : [],
            raw: cap[0]
          };

          if (item.header.length === item.align.length) {
            let l = item.align.length;
            let i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells(item.cells[i], item.header.length);
            }

            return item;
          }
        }
      }

      hr(src) {
        const cap = this.rules.block.hr.exec(src);
        if (cap) {
          return {
            type: 'hr',
            raw: cap[0]
          };
        }
      }

      blockquote(src) {
        const cap = this.rules.block.blockquote.exec(src);
        if (cap) {
          const text = cap[0].replace(/^ *> ?/gm, '');

          return {
            type: 'blockquote',
            raw: cap[0],
            text
          };
        }
      }

      list(src) {
        const cap = this.rules.block.list.exec(src);
        if (cap) {
          let raw = cap[0];
          const bull = cap[2];
          const isordered = bull.length > 1;

          const list = {
            type: 'list',
            raw,
            ordered: isordered,
            start: isordered ? +bull.slice(0, -1) : '',
            loose: false,
            items: []
          };

          // Get each top-level item.
          const itemMatch = cap[0].match(this.rules.block.item);

          let next = false,
            item,
            space,
            bcurr,
            bnext,
            addBack,
            loose,
            istask,
            ischecked,
            endMatch;

          let l = itemMatch.length;
          bcurr = this.rules.block.listItemStart.exec(itemMatch[0]);
          for (let i = 0; i < l; i++) {
            item = itemMatch[i];
            raw = item;

            if (!this.options.pedantic) {
              // Determine if current item contains the end of the list
              endMatch = item.match(new RegExp('\\n\\s*\\n {0,' + (bcurr[0].length - 1) + '}\\S'));
              if (endMatch) {
                addBack = item.length - endMatch.index + itemMatch.slice(i + 1).join('\n').length;
                list.raw = list.raw.substring(0, list.raw.length - addBack);

                item = item.substring(0, endMatch.index);
                raw = item;
                l = i + 1;
              }
            }

            // Determine whether the next list item belongs here.
            // Backpedal if it does not belong in this list.
            if (i !== l - 1) {
              bnext = this.rules.block.listItemStart.exec(itemMatch[i + 1]);
              if (
                !this.options.pedantic
                  ? bnext[1].length >= bcurr[0].length || bnext[1].length > 3
                  : bnext[1].length > bcurr[1].length
              ) {
                // nested list or continuation
                itemMatch.splice(i, 2, itemMatch[i] + (!this.options.pedantic && bnext[1].length < bcurr[0].length && !itemMatch[i].match(/\n$/) ? '' : '\n') + itemMatch[i + 1]);
                i--;
                l--;
                continue;
              } else if (
                // different bullet style
                !this.options.pedantic || this.options.smartLists
                  ? bnext[2][bnext[2].length - 1] !== bull[bull.length - 1]
                  : isordered === (bnext[2].length === 1)
              ) {
                addBack = itemMatch.slice(i + 1).join('\n').length;
                list.raw = list.raw.substring(0, list.raw.length - addBack);
                i = l - 1;
              }
              bcurr = bnext;
            }

            // Remove the list item's bullet
            // so it is seen as the next token.
            space = item.length;
            item = item.replace(/^ *([*+-]|\d+[.)]) ?/, '');

            // Outdent whatever the
            // list item contains. Hacky.
            if (~item.indexOf('\n ')) {
              space -= item.length;
              item = !this.options.pedantic
                ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                : item.replace(/^ {1,4}/gm, '');
            }

            // trim item newlines at end
            item = rtrim(item, '\n');
            if (i !== l - 1) {
              raw = raw + '\n';
            }

            // Determine whether item is loose or not.
            // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
            // for discount behavior.
            loose = next || /\n\n(?!\s*$)/.test(raw);
            if (i !== l - 1) {
              next = raw.slice(-2) === '\n\n';
              if (!loose) loose = next;
            }

            if (loose) {
              list.loose = true;
            }

            // Check for task list items
            if (this.options.gfm) {
              istask = /^\[[ xX]\] /.test(item);
              ischecked = undefined;
              if (istask) {
                ischecked = item[1] !== ' ';
                item = item.replace(/^\[[ xX]\] +/, '');
              }
            }

            list.items.push({
              type: 'list_item',
              raw,
              task: istask,
              checked: ischecked,
              loose: loose,
              text: item
            });
          }

          return list;
        }
      }

      html(src) {
        const cap = this.rules.block.html.exec(src);
        if (cap) {
          return {
            type: this.options.sanitize
              ? 'paragraph'
              : 'html',
            raw: cap[0],
            pre: !this.options.sanitizer
              && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
            text: this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0])) : cap[0]
          };
        }
      }

      def(src) {
        const cap = this.rules.block.def.exec(src);
        if (cap) {
          if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
          const tag = cap[1].toLowerCase().replace(/\s+/g, ' ');
          return {
            type: 'def',
            tag,
            raw: cap[0],
            href: cap[2],
            title: cap[3]
          };
        }
      }

      table(src) {
        const cap = this.rules.block.table.exec(src);
        if (cap) {
          const item = {
            type: 'table',
            header: splitCells(cap[1].replace(/^ *| *\| *$/g, '')),
            align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: cap[3] ? cap[3].replace(/\n$/, '').split('\n') : []
          };

          if (item.header.length === item.align.length) {
            item.raw = cap[0];

            let l = item.align.length;
            let i;
            for (i = 0; i < l; i++) {
              if (/^ *-+: *$/.test(item.align[i])) {
                item.align[i] = 'right';
              } else if (/^ *:-+: *$/.test(item.align[i])) {
                item.align[i] = 'center';
              } else if (/^ *:-+ *$/.test(item.align[i])) {
                item.align[i] = 'left';
              } else {
                item.align[i] = null;
              }
            }

            l = item.cells.length;
            for (i = 0; i < l; i++) {
              item.cells[i] = splitCells(
                item.cells[i].replace(/^ *\| *| *\| *$/g, ''),
                item.header.length);
            }

            return item;
          }
        }
      }

      lheading(src) {
        const cap = this.rules.block.lheading.exec(src);
        if (cap) {
          return {
            type: 'heading',
            raw: cap[0],
            depth: cap[2].charAt(0) === '=' ? 1 : 2,
            text: cap[1]
          };
        }
      }

      paragraph(src) {
        const cap = this.rules.block.paragraph.exec(src);
        if (cap) {
          return {
            type: 'paragraph',
            raw: cap[0],
            text: cap[1].charAt(cap[1].length - 1) === '\n'
              ? cap[1].slice(0, -1)
              : cap[1]
          };
        }
      }

      text(src) {
        const cap = this.rules.block.text.exec(src);
        if (cap) {
          return {
            type: 'text',
            raw: cap[0],
            text: cap[0]
          };
        }
      }

      escape(src) {
        const cap = this.rules.inline.escape.exec(src);
        if (cap) {
          return {
            type: 'escape',
            raw: cap[0],
            text: escape$2(cap[1])
          };
        }
      }

      tag(src, inLink, inRawBlock) {
        const cap = this.rules.inline.tag.exec(src);
        if (cap) {
          if (!inLink && /^<a /i.test(cap[0])) {
            inLink = true;
          } else if (inLink && /^<\/a>/i.test(cap[0])) {
            inLink = false;
          }
          if (!inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = true;
          } else if (inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
            inRawBlock = false;
          }

          return {
            type: this.options.sanitize
              ? 'text'
              : 'html',
            raw: cap[0],
            inLink,
            inRawBlock,
            text: this.options.sanitize
              ? (this.options.sanitizer
                ? this.options.sanitizer(cap[0])
                : escape$2(cap[0]))
              : cap[0]
          };
        }
      }

      link(src) {
        const cap = this.rules.inline.link.exec(src);
        if (cap) {
          const trimmedUrl = cap[2].trim();
          if (!this.options.pedantic && /^</.test(trimmedUrl)) {
            // commonmark requires matching angle brackets
            if (!(/>$/.test(trimmedUrl))) {
              return;
            }

            // ending angle bracket cannot be escaped
            const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), '\\');
            if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
              return;
            }
          } else {
            // find closing parenthesis
            const lastParenIndex = findClosingBracket(cap[2], '()');
            if (lastParenIndex > -1) {
              const start = cap[0].indexOf('!') === 0 ? 5 : 4;
              const linkLen = start + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = '';
            }
          }
          let href = cap[2];
          let title = '';
          if (this.options.pedantic) {
            // split pedantic href and title
            const link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

            if (link) {
              href = link[1];
              title = link[3];
            }
          } else {
            title = cap[3] ? cap[3].slice(1, -1) : '';
          }

          href = href.trim();
          if (/^</.test(href)) {
            if (this.options.pedantic && !(/>$/.test(trimmedUrl))) {
              // pedantic allows starting angle bracket without ending angle bracket
              href = href.slice(1);
            } else {
              href = href.slice(1, -1);
            }
          }
          return outputLink(cap, {
            href: href ? href.replace(this.rules.inline._escapes, '$1') : href,
            title: title ? title.replace(this.rules.inline._escapes, '$1') : title
          }, cap[0]);
        }
      }

      reflink(src, links) {
        let cap;
        if ((cap = this.rules.inline.reflink.exec(src))
            || (cap = this.rules.inline.nolink.exec(src))) {
          let link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
          link = links[link.toLowerCase()];
          if (!link || !link.href) {
            const text = cap[0].charAt(0);
            return {
              type: 'text',
              raw: text,
              text
            };
          }
          return outputLink(cap, link, cap[0]);
        }
      }

      emStrong(src, maskedSrc, prevChar = '') {
        let match = this.rules.inline.emStrong.lDelim.exec(src);
        if (!match) return;

        // _ can't be between two alphanumerics. \p{L}\p{N} includes non-english alphabet/numbers as well
        if (match[3] && prevChar.match(/[\p{L}\p{N}]/u)) return;

        const nextChar = match[1] || match[2] || '';

        if (!nextChar || (nextChar && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
          const lLength = match[0].length - 1;
          let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;

          const endReg = match[0][0] === '*' ? this.rules.inline.emStrong.rDelimAst : this.rules.inline.emStrong.rDelimUnd;
          endReg.lastIndex = 0;

          // Clip maskedSrc to same section of string as src (move to lexer?)
          maskedSrc = maskedSrc.slice(-1 * src.length + lLength);

          while ((match = endReg.exec(maskedSrc)) != null) {
            rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];

            if (!rDelim) continue; // skip single * in __abc*abc__

            rLength = rDelim.length;

            if (match[3] || match[4]) { // found another Left Delim
              delimTotal += rLength;
              continue;
            } else if (match[5] || match[6]) { // either Left or Right Delim
              if (lLength % 3 && !((lLength + rLength) % 3)) {
                midDelimTotal += rLength;
                continue; // CommonMark Emphasis Rules 9-10
              }
            }

            delimTotal -= rLength;

            if (delimTotal > 0) continue; // Haven't found enough closing delimiters

            // Remove extra characters. *a*** -> *a*
            rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);

            // Create `em` if smallest delimiter has odd char count. *a***
            if (Math.min(lLength, rLength) % 2) {
              return {
                type: 'em',
                raw: src.slice(0, lLength + match.index + rLength + 1),
                text: src.slice(1, lLength + match.index + rLength)
              };
            }

            // Create 'strong' if smallest delimiter has even char count. **a***
            return {
              type: 'strong',
              raw: src.slice(0, lLength + match.index + rLength + 1),
              text: src.slice(2, lLength + match.index + rLength - 1)
            };
          }
        }
      }

      codespan(src) {
        const cap = this.rules.inline.code.exec(src);
        if (cap) {
          let text = cap[2].replace(/\n/g, ' ');
          const hasNonSpaceChars = /[^ ]/.test(text);
          const hasSpaceCharsOnBothEnds = /^ /.test(text) && / $/.test(text);
          if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
            text = text.substring(1, text.length - 1);
          }
          text = escape$2(text, true);
          return {
            type: 'codespan',
            raw: cap[0],
            text
          };
        }
      }

      br(src) {
        const cap = this.rules.inline.br.exec(src);
        if (cap) {
          return {
            type: 'br',
            raw: cap[0]
          };
        }
      }

      del(src) {
        const cap = this.rules.inline.del.exec(src);
        if (cap) {
          return {
            type: 'del',
            raw: cap[0],
            text: cap[2]
          };
        }
      }

      autolink(src, mangle) {
        const cap = this.rules.inline.autolink.exec(src);
        if (cap) {
          let text, href;
          if (cap[2] === '@') {
            text = escape$2(this.options.mangle ? mangle(cap[1]) : cap[1]);
            href = 'mailto:' + text;
          } else {
            text = escape$2(cap[1]);
            href = text;
          }

          return {
            type: 'link',
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: 'text',
                raw: text,
                text
              }
            ]
          };
        }
      }

      url(src, mangle) {
        let cap;
        if (cap = this.rules.inline.url.exec(src)) {
          let text, href;
          if (cap[2] === '@') {
            text = escape$2(this.options.mangle ? mangle(cap[0]) : cap[0]);
            href = 'mailto:' + text;
          } else {
            // do extended autolink path validation
            let prevCapZero;
            do {
              prevCapZero = cap[0];
              cap[0] = this.rules.inline._backpedal.exec(cap[0])[0];
            } while (prevCapZero !== cap[0]);
            text = escape$2(cap[0]);
            if (cap[1] === 'www.') {
              href = 'http://' + text;
            } else {
              href = text;
            }
          }
          return {
            type: 'link',
            raw: cap[0],
            text,
            href,
            tokens: [
              {
                type: 'text',
                raw: text,
                text
              }
            ]
          };
        }
      }

      inlineText(src, inRawBlock, smartypants) {
        const cap = this.rules.inline.text.exec(src);
        if (cap) {
          let text;
          if (inRawBlock) {
            text = this.options.sanitize ? (this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape$2(cap[0])) : cap[0];
          } else {
            text = escape$2(this.options.smartypants ? smartypants(cap[0]) : cap[0]);
          }
          return {
            type: 'text',
            raw: cap[0],
            text
          };
        }
      }
    };

    const {
      noopTest,
      edit,
      merge: merge$1
    } = helpers;

    /**
     * Block-Level Grammar
     */
    const block$1 = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences: /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
      html: '^ {0,3}(?:' // optional indentation
        + '<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)' // (1)
        + '|comment[^\\n]*(\\n+|$)' // (2)
        + '|<\\?[\\s\\S]*?(?:\\?>\\n*|$)' // (3)
        + '|<![A-Z][\\s\\S]*?(?:>\\n*|$)' // (4)
        + '|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)' // (5)
        + '|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (6)
        + '|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) open tag
        + '|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)' // (7) closing tag
        + ')',
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      nptable: noopTest,
      table: noopTest,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      // regex template, placeholders will be replaced according to different paragraph
      // interruption rules of commonmark and the original markdown spec:
      _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
      text: /^[^\n]+/
    };

    block$1._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
    block$1._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
    block$1.def = edit(block$1.def)
      .replace('label', block$1._label)
      .replace('title', block$1._title)
      .getRegex();

    block$1.bullet = /(?:[*+-]|\d{1,9}[.)])/;
    block$1.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/;
    block$1.item = edit(block$1.item, 'gm')
      .replace(/bull/g, block$1.bullet)
      .getRegex();

    block$1.listItemStart = edit(/^( *)(bull) */)
      .replace('bull', block$1.bullet)
      .getRegex();

    block$1.list = edit(block$1.list)
      .replace(/bull/g, block$1.bullet)
      .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
      .replace('def', '\\n+(?=' + block$1.def.source + ')')
      .getRegex();

    block$1._tag = 'address|article|aside|base|basefont|blockquote|body|caption'
      + '|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption'
      + '|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe'
      + '|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option'
      + '|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr'
      + '|track|ul';
    block$1._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/;
    block$1.html = edit(block$1.html, 'i')
      .replace('comment', block$1._comment)
      .replace('tag', block$1._tag)
      .replace('attribute', / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/)
      .getRegex();

    block$1.paragraph = edit(block$1._paragraph)
      .replace('hr', block$1.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('|lheading', '') // setex headings don't interrupt commonmark paragraphs
      .replace('blockquote', ' {0,3}>')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block$1._tag) // pars can be interrupted by type (6) html blocks
      .getRegex();

    block$1.blockquote = edit(block$1.blockquote)
      .replace('paragraph', block$1.paragraph)
      .getRegex();

    /**
     * Normal Block Grammar
     */

    block$1.normal = merge$1({}, block$1);

    /**
     * GFM Block Grammar
     */

    block$1.gfm = merge$1({}, block$1.normal, {
      nptable: '^ *([^|\\n ].*\\|.*)\\n' // Header
        + ' {0,3}([-:]+ *\\|[-| :]*)' // Align
        + '(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)', // Cells
      table: '^ *\\|(.+)\\n' // Header
        + ' {0,3}\\|?( *[-:]+[-| :]*)' // Align
        + '(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)' // Cells
    });

    block$1.gfm.nptable = edit(block$1.gfm.nptable)
      .replace('hr', block$1.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('blockquote', ' {0,3}>')
      .replace('code', ' {4}[^\\n]')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block$1._tag) // tables can be interrupted by type (6) html blocks
      .getRegex();

    block$1.gfm.table = edit(block$1.gfm.table)
      .replace('hr', block$1.hr)
      .replace('heading', ' {0,3}#{1,6} ')
      .replace('blockquote', ' {0,3}>')
      .replace('code', ' {4}[^\\n]')
      .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
      .replace('list', ' {0,3}(?:[*+-]|1[.)]) ') // only lists starting from 1 can interrupt
      .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)')
      .replace('tag', block$1._tag) // tables can be interrupted by type (6) html blocks
      .getRegex();

    /**
     * Pedantic grammar (original John Gruber's loose markdown specification)
     */

    block$1.pedantic = merge$1({}, block$1.normal, {
      html: edit(
        '^ *(?:comment *(?:\\n|\\s*$)'
        + '|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)' // closed tag
        + '|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))')
        .replace('comment', block$1._comment)
        .replace(/tag/g, '(?!(?:'
          + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub'
          + '|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)'
          + '\\b)\\w+(?!:|[^\\w\\s@]*@)\\b')
        .getRegex(),
      def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
      heading: /^(#{1,6})(.*)(?:\n+|$)/,
      fences: noopTest, // fences not supported
      paragraph: edit(block$1.normal._paragraph)
        .replace('hr', block$1.hr)
        .replace('heading', ' *#{1,6} *[^\n]')
        .replace('lheading', block$1.lheading)
        .replace('blockquote', ' {0,3}>')
        .replace('|fences', '')
        .replace('|list', '')
        .replace('|html', '')
        .getRegex()
    });

    /**
     * Inline-Level Grammar
     */
    const inline$1 = {
      escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
      autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
      url: noopTest,
      tag: '^comment'
        + '|^</[a-zA-Z][\\w:-]*\\s*>' // self-closing tag
        + '|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>' // open tag
        + '|^<\\?[\\s\\S]*?\\?>' // processing instruction, e.g. <?php ?>
        + '|^<![a-zA-Z]+\\s[\\s\\S]*?>' // declaration, e.g. <!DOCTYPE html>
        + '|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>', // CDATA section
      link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
      reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
      nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
      reflinkSearch: 'reflink|nolink(?!\\()',
      emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        //        (1) and (2) can only be a Right Delimiter. (3) and (4) can only be Left.  (5) and (6) can be either Left or Right.
        //        () Skip other delimiter (1) #***                   (2) a***#, a***                   (3) #***a, ***a                 (4) ***#              (5) #***#                 (6) a***a
        rDelimAst: /\_\_[^_*]*?\*[^_*]*?\_\_|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd: /\*\*[^_*]*?\_[^_*]*?\*\*|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/ // ^- Not allowed for _
      },
      code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
      br: /^( {2,}|\\)\n(?!\s*$)/,
      del: noopTest,
      text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
      punctuation: /^([\spunctuation])/
    };

    // list of punctuation marks from CommonMark spec
    // without * and _ to handle the different emphasis markers * and _
    inline$1._punctuation = '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~';
    inline$1.punctuation = edit(inline$1.punctuation).replace(/punctuation/g, inline$1._punctuation).getRegex();

    // sequences em should skip over [title](link), `code`, <html>
    inline$1.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g;
    inline$1.escapedEmSt = /\\\*|\\_/g;

    inline$1._comment = edit(block$1._comment).replace('(?:-->|$)', '-->').getRegex();

    inline$1.emStrong.lDelim = edit(inline$1.emStrong.lDelim)
      .replace(/punct/g, inline$1._punctuation)
      .getRegex();

    inline$1.emStrong.rDelimAst = edit(inline$1.emStrong.rDelimAst, 'g')
      .replace(/punct/g, inline$1._punctuation)
      .getRegex();

    inline$1.emStrong.rDelimUnd = edit(inline$1.emStrong.rDelimUnd, 'g')
      .replace(/punct/g, inline$1._punctuation)
      .getRegex();

    inline$1._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;

    inline$1._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
    inline$1._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
    inline$1.autolink = edit(inline$1.autolink)
      .replace('scheme', inline$1._scheme)
      .replace('email', inline$1._email)
      .getRegex();

    inline$1._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;

    inline$1.tag = edit(inline$1.tag)
      .replace('comment', inline$1._comment)
      .replace('attribute', inline$1._attribute)
      .getRegex();

    inline$1._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
    inline$1._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/;
    inline$1._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;

    inline$1.link = edit(inline$1.link)
      .replace('label', inline$1._label)
      .replace('href', inline$1._href)
      .replace('title', inline$1._title)
      .getRegex();

    inline$1.reflink = edit(inline$1.reflink)
      .replace('label', inline$1._label)
      .getRegex();

    inline$1.reflinkSearch = edit(inline$1.reflinkSearch, 'g')
      .replace('reflink', inline$1.reflink)
      .replace('nolink', inline$1.nolink)
      .getRegex();

    /**
     * Normal Inline Grammar
     */

    inline$1.normal = merge$1({}, inline$1);

    /**
     * Pedantic Inline Grammar
     */

    inline$1.pedantic = merge$1({}, inline$1.normal, {
      strong: {
        start: /^__|\*\*/,
        middle: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        endAst: /\*\*(?!\*)/g,
        endUnd: /__(?!_)/g
      },
      em: {
        start: /^_|\*/,
        middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
        endAst: /\*(?!\*)/g,
        endUnd: /_(?!_)/g
      },
      link: edit(/^!?\[(label)\]\((.*?)\)/)
        .replace('label', inline$1._label)
        .getRegex(),
      reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/)
        .replace('label', inline$1._label)
        .getRegex()
    });

    /**
     * GFM Inline Grammar
     */

    inline$1.gfm = merge$1({}, inline$1.normal, {
      escape: edit(inline$1.escape).replace('])', '~|])').getRegex(),
      _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
      url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
      del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
      text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
    });

    inline$1.gfm.url = edit(inline$1.gfm.url, 'i')
      .replace('email', inline$1.gfm._extended_email)
      .getRegex();
    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline$1.breaks = merge$1({}, inline$1.gfm, {
      br: edit(inline$1.br).replace('{2,}', '*').getRegex(),
      text: edit(inline$1.gfm.text)
        .replace('\\b_', '\\b_| {2,}\\n')
        .replace(/\{2,\}/g, '*')
        .getRegex()
    });

    var rules = {
      block: block$1,
      inline: inline$1
    };

    const Tokenizer$1 = Tokenizer_1;
    const { defaults: defaults$3 } = defaults$5.exports;
    const { block, inline } = rules;
    const { repeatString } = helpers;

    /**
     * smartypants text replacement
     */
    function smartypants(text) {
      return text
        // em-dashes
        .replace(/---/g, '\u2014')
        // en-dashes
        .replace(/--/g, '\u2013')
        // opening singles
        .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
        // closing singles & apostrophes
        .replace(/'/g, '\u2019')
        // opening doubles
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
        // closing doubles
        .replace(/"/g, '\u201d')
        // ellipses
        .replace(/\.{3}/g, '\u2026');
    }

    /**
     * mangle email addresses
     */
    function mangle(text) {
      let out = '',
        i,
        ch;

      const l = text.length;
      for (i = 0; i < l; i++) {
        ch = text.charCodeAt(i);
        if (Math.random() > 0.5) {
          ch = 'x' + ch.toString(16);
        }
        out += '&#' + ch + ';';
      }

      return out;
    }

    /**
     * Block Lexer
     */
    var Lexer_1 = class Lexer {
      constructor(options) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options || defaults$3;
        this.options.tokenizer = this.options.tokenizer || new Tokenizer$1();
        this.tokenizer = this.options.tokenizer;
        this.tokenizer.options = this.options;

        const rules = {
          block: block.normal,
          inline: inline.normal
        };

        if (this.options.pedantic) {
          rules.block = block.pedantic;
          rules.inline = inline.pedantic;
        } else if (this.options.gfm) {
          rules.block = block.gfm;
          if (this.options.breaks) {
            rules.inline = inline.breaks;
          } else {
            rules.inline = inline.gfm;
          }
        }
        this.tokenizer.rules = rules;
      }

      /**
       * Expose Rules
       */
      static get rules() {
        return {
          block,
          inline
        };
      }

      /**
       * Static Lex Method
       */
      static lex(src, options) {
        const lexer = new Lexer(options);
        return lexer.lex(src);
      }

      /**
       * Static Lex Inline Method
       */
      static lexInline(src, options) {
        const lexer = new Lexer(options);
        return lexer.inlineTokens(src);
      }

      /**
       * Preprocessing
       */
      lex(src) {
        src = src
          .replace(/\r\n|\r/g, '\n')
          .replace(/\t/g, '    ');

        this.blockTokens(src, this.tokens, true);

        this.inline(this.tokens);

        return this.tokens;
      }

      /**
       * Lexing
       */
      blockTokens(src, tokens = [], top = true) {
        if (this.options.pedantic) {
          src = src.replace(/^ +$/gm, '');
        }
        let token, i, l, lastToken, cutSrc, lastParagraphClipped;

        while (src) {
          if (this.options.extensions
            && this.options.extensions.block
            && this.options.extensions.block.some((extTokenizer) => {
              if (token = extTokenizer.call(this, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
            continue;
          }

          // newline
          if (token = this.tokenizer.space(src)) {
            src = src.substring(token.raw.length);
            if (token.type) {
              tokens.push(token);
            }
            continue;
          }

          // code
          if (token = this.tokenizer.code(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            // An indented code block cannot interrupt a paragraph.
            if (lastToken && lastToken.type === 'paragraph') {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // fences
          if (token = this.tokenizer.fences(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // heading
          if (token = this.tokenizer.heading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // table no leading pipe (gfm)
          if (token = this.tokenizer.nptable(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // hr
          if (token = this.tokenizer.hr(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // blockquote
          if (token = this.tokenizer.blockquote(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.blockTokens(token.text, [], top);
            tokens.push(token);
            continue;
          }

          // list
          if (token = this.tokenizer.list(src)) {
            src = src.substring(token.raw.length);
            l = token.items.length;
            for (i = 0; i < l; i++) {
              token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
            }
            tokens.push(token);
            continue;
          }

          // html
          if (token = this.tokenizer.html(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // def
          if (top && (token = this.tokenizer.def(src))) {
            src = src.substring(token.raw.length);
            if (!this.tokens.links[token.tag]) {
              this.tokens.links[token.tag] = {
                href: token.href,
                title: token.title
              };
            }
            continue;
          }

          // table (gfm)
          if (token = this.tokenizer.table(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // lheading
          if (token = this.tokenizer.lheading(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // top-level paragraph
          // prevent paragraph consuming extensions by clipping 'src' to extension start
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startBlock) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startBlock.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call(this, tempSrc);
              if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (top && (token = this.tokenizer.paragraph(cutSrc))) {
            lastToken = tokens[tokens.length - 1];
            if (lastParagraphClipped && lastToken.type === 'paragraph') {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            } else {
              tokens.push(token);
            }
            lastParagraphClipped = (cutSrc.length !== src.length);
            src = src.substring(token.raw.length);
            continue;
          }

          // text
          if (token = this.tokenizer.text(src)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === 'text') {
              lastToken.raw += '\n' + token.raw;
              lastToken.text += '\n' + token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          if (src) {
            const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        return tokens;
      }

      inline(tokens) {
        let i,
          j,
          k,
          l2,
          row,
          token;

        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];
          switch (token.type) {
            case 'paragraph':
            case 'text':
            case 'heading': {
              token.tokens = [];
              this.inlineTokens(token.text, token.tokens);
              break;
            }
            case 'table': {
              token.tokens = {
                header: [],
                cells: []
              };

              // header
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                token.tokens.header[j] = [];
                this.inlineTokens(token.header[j], token.tokens.header[j]);
              }

              // cells
              l2 = token.cells.length;
              for (j = 0; j < l2; j++) {
                row = token.cells[j];
                token.tokens.cells[j] = [];
                for (k = 0; k < row.length; k++) {
                  token.tokens.cells[j][k] = [];
                  this.inlineTokens(row[k], token.tokens.cells[j][k]);
                }
              }

              break;
            }
            case 'blockquote': {
              this.inline(token.tokens);
              break;
            }
            case 'list': {
              l2 = token.items.length;
              for (j = 0; j < l2; j++) {
                this.inline(token.items[j].tokens);
              }
              break;
            }
          }
        }

        return tokens;
      }

      /**
       * Lexing/Compiling
       */
      inlineTokens(src, tokens = [], inLink = false, inRawBlock = false) {
        let token, lastToken, cutSrc;

        // String with links masked to avoid interference with em and strong
        let maskedSrc = src;
        let match;
        let keepPrevChar, prevChar;

        // Mask out reflinks
        if (this.tokens.links) {
          const links = Object.keys(this.tokens.links);
          if (links.length > 0) {
            while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
              if (links.includes(match[0].slice(match[0].lastIndexOf('[') + 1, -1))) {
                maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
              }
            }
          }
        }
        // Mask out other blocks
        while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '[' + repeatString('a', match[0].length - 2) + ']' + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        }

        // Mask out escaped em & strong delimiters
        while ((match = this.tokenizer.rules.inline.escapedEmSt.exec(maskedSrc)) != null) {
          maskedSrc = maskedSrc.slice(0, match.index) + '++' + maskedSrc.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        }

        while (src) {
          if (!keepPrevChar) {
            prevChar = '';
          }
          keepPrevChar = false;

          // extensions
          if (this.options.extensions
            && this.options.extensions.inline
            && this.options.extensions.inline.some((extTokenizer) => {
              if (token = extTokenizer.call(this, src, tokens)) {
                src = src.substring(token.raw.length);
                tokens.push(token);
                return true;
              }
              return false;
            })) {
            continue;
          }

          // escape
          if (token = this.tokenizer.escape(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // tag
          if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
            src = src.substring(token.raw.length);
            inLink = token.inLink;
            inRawBlock = token.inRawBlock;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && token.type === 'text' && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // link
          if (token = this.tokenizer.link(src)) {
            src = src.substring(token.raw.length);
            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
            }
            tokens.push(token);
            continue;
          }

          // reflink, nolink
          if (token = this.tokenizer.reflink(src, this.tokens.links)) {
            src = src.substring(token.raw.length);
            lastToken = tokens[tokens.length - 1];
            if (token.type === 'link') {
              token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
              tokens.push(token);
            } else if (lastToken && token.type === 'text' && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          // em & strong
          if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }

          // code
          if (token = this.tokenizer.codespan(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // br
          if (token = this.tokenizer.br(src)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // del (gfm)
          if (token = this.tokenizer.del(src)) {
            src = src.substring(token.raw.length);
            token.tokens = this.inlineTokens(token.text, [], inLink, inRawBlock);
            tokens.push(token);
            continue;
          }

          // autolink
          if (token = this.tokenizer.autolink(src, mangle)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // url (gfm)
          if (!inLink && (token = this.tokenizer.url(src, mangle))) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            continue;
          }

          // text
          // prevent inlineText consuming extensions by clipping 'src' to extension start
          cutSrc = src;
          if (this.options.extensions && this.options.extensions.startInline) {
            let startIndex = Infinity;
            const tempSrc = src.slice(1);
            let tempStart;
            this.options.extensions.startInline.forEach(function(getStartIndex) {
              tempStart = getStartIndex.call(this, tempSrc);
              if (typeof tempStart === 'number' && tempStart >= 0) { startIndex = Math.min(startIndex, tempStart); }
            });
            if (startIndex < Infinity && startIndex >= 0) {
              cutSrc = src.substring(0, startIndex + 1);
            }
          }
          if (token = this.tokenizer.inlineText(cutSrc, inRawBlock, smartypants)) {
            src = src.substring(token.raw.length);
            if (token.raw.slice(-1) !== '_') { // Track prevChar before string of ____ started
              prevChar = token.raw.slice(-1);
            }
            keepPrevChar = true;
            lastToken = tokens[tokens.length - 1];
            if (lastToken && lastToken.type === 'text') {
              lastToken.raw += token.raw;
              lastToken.text += token.text;
            } else {
              tokens.push(token);
            }
            continue;
          }

          if (src) {
            const errMsg = 'Infinite loop on byte: ' + src.charCodeAt(0);
            if (this.options.silent) {
              console.error(errMsg);
              break;
            } else {
              throw new Error(errMsg);
            }
          }
        }

        return tokens;
      }
    };

    const { defaults: defaults$2 } = defaults$5.exports;
    const {
      cleanUrl,
      escape: escape$1
    } = helpers;

    /**
     * Renderer
     */
    var Renderer_1 = class Renderer {
      constructor(options) {
        this.options = options || defaults$2;
      }

      code(code, infostring, escaped) {
        const lang = (infostring || '').match(/\S*/)[0];
        if (this.options.highlight) {
          const out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped = true;
            code = out;
          }
        }

        code = code.replace(/\n$/, '') + '\n';

        if (!lang) {
          return '<pre><code>'
            + (escaped ? code : escape$1(code, true))
            + '</code></pre>\n';
        }

        return '<pre><code class="'
          + this.options.langPrefix
          + escape$1(lang, true)
          + '">'
          + (escaped ? code : escape$1(code, true))
          + '</code></pre>\n';
      }

      blockquote(quote) {
        return '<blockquote>\n' + quote + '</blockquote>\n';
      }

      html(html) {
        return html;
      }

      heading(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return '<h'
            + level
            + ' id="'
            + this.options.headerPrefix
            + slugger.slug(raw)
            + '">'
            + text
            + '</h'
            + level
            + '>\n';
        }
        // ignore IDs
        return '<h' + level + '>' + text + '</h' + level + '>\n';
      }

      hr() {
        return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
      }

      list(body, ordered, start) {
        const type = ordered ? 'ol' : 'ul',
          startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
        return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
      }

      listitem(text) {
        return '<li>' + text + '</li>\n';
      }

      checkbox(checked) {
        return '<input '
          + (checked ? 'checked="" ' : '')
          + 'disabled="" type="checkbox"'
          + (this.options.xhtml ? ' /' : '')
          + '> ';
      }

      paragraph(text) {
        return '<p>' + text + '</p>\n';
      }

      table(header, body) {
        if (body) body = '<tbody>' + body + '</tbody>';

        return '<table>\n'
          + '<thead>\n'
          + header
          + '</thead>\n'
          + body
          + '</table>\n';
      }

      tablerow(content) {
        return '<tr>\n' + content + '</tr>\n';
      }

      tablecell(content, flags) {
        const type = flags.header ? 'th' : 'td';
        const tag = flags.align
          ? '<' + type + ' align="' + flags.align + '">'
          : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
      }

      // span level renderer
      strong(text) {
        return '<strong>' + text + '</strong>';
      }

      em(text) {
        return '<em>' + text + '</em>';
      }

      codespan(text) {
        return '<code>' + text + '</code>';
      }

      br() {
        return this.options.xhtml ? '<br/>' : '<br>';
      }

      del(text) {
        return '<del>' + text + '</del>';
      }

      link(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        let out = '<a href="' + escape$1(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
      }

      image(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }

        let out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
      }

      text(text) {
        return text;
      }
    };

    /**
     * TextRenderer
     * returns only the textual part of the token
     */

    var TextRenderer_1 = class TextRenderer {
      // no need for block level renderers
      strong(text) {
        return text;
      }

      em(text) {
        return text;
      }

      codespan(text) {
        return text;
      }

      del(text) {
        return text;
      }

      html(text) {
        return text;
      }

      text(text) {
        return text;
      }

      link(href, title, text) {
        return '' + text;
      }

      image(href, title, text) {
        return '' + text;
      }

      br() {
        return '';
      }
    };

    /**
     * Slugger generates header id
     */

    var Slugger_1 = class Slugger {
      constructor() {
        this.seen = {};
      }

      serialize(value) {
        return value
          .toLowerCase()
          .trim()
          // remove html tags
          .replace(/<[!\/a-z].*?>/ig, '')
          // remove unwanted chars
          .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
          .replace(/\s/g, '-');
      }

      /**
       * Finds the next safe (unique) slug to use
       */
      getNextSafeSlug(originalSlug, isDryRun) {
        let slug = originalSlug;
        let occurenceAccumulator = 0;
        if (this.seen.hasOwnProperty(slug)) {
          occurenceAccumulator = this.seen[originalSlug];
          do {
            occurenceAccumulator++;
            slug = originalSlug + '-' + occurenceAccumulator;
          } while (this.seen.hasOwnProperty(slug));
        }
        if (!isDryRun) {
          this.seen[originalSlug] = occurenceAccumulator;
          this.seen[slug] = 0;
        }
        return slug;
      }

      /**
       * Convert string to unique id
       * @param {object} options
       * @param {boolean} options.dryrun Generates the next unique slug without updating the internal accumulator.
       */
      slug(value, options = {}) {
        const slug = this.serialize(value);
        return this.getNextSafeSlug(slug, options.dryrun);
      }
    };

    const Renderer$1 = Renderer_1;
    const TextRenderer$1 = TextRenderer_1;
    const Slugger$1 = Slugger_1;
    const { defaults: defaults$1 } = defaults$5.exports;
    const {
      unescape
    } = helpers;

    /**
     * Parsing & Compiling
     */
    var Parser_1 = class Parser {
      constructor(options) {
        this.options = options || defaults$1;
        this.options.renderer = this.options.renderer || new Renderer$1();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.textRenderer = new TextRenderer$1();
        this.slugger = new Slugger$1();
      }

      /**
       * Static Parse Method
       */
      static parse(tokens, options) {
        const parser = new Parser(options);
        return parser.parse(tokens);
      }

      /**
       * Static Parse Inline Method
       */
      static parseInline(tokens, options) {
        const parser = new Parser(options);
        return parser.parseInline(tokens);
      }

      /**
       * Parse Loop
       */
      parse(tokens, top = true) {
        let out = '',
          i,
          j,
          k,
          l2,
          l3,
          row,
          cell,
          header,
          body,
          token,
          ordered,
          start,
          loose,
          itemBody,
          item,
          checked,
          task,
          checkbox,
          ret;

        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];

          // Run any renderer extensions
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call(this, token);
            if (ret !== false || !['space', 'hr', 'heading', 'code', 'table', 'blockquote', 'list', 'html', 'paragraph', 'text'].includes(token.type)) {
              out += ret || '';
              continue;
            }
          }

          switch (token.type) {
            case 'space': {
              continue;
            }
            case 'hr': {
              out += this.renderer.hr();
              continue;
            }
            case 'heading': {
              out += this.renderer.heading(
                this.parseInline(token.tokens),
                token.depth,
                unescape(this.parseInline(token.tokens, this.textRenderer)),
                this.slugger);
              continue;
            }
            case 'code': {
              out += this.renderer.code(token.text,
                token.lang,
                token.escaped);
              continue;
            }
            case 'table': {
              header = '';

              // header
              cell = '';
              l2 = token.header.length;
              for (j = 0; j < l2; j++) {
                cell += this.renderer.tablecell(
                  this.parseInline(token.tokens.header[j]),
                  { header: true, align: token.align[j] }
                );
              }
              header += this.renderer.tablerow(cell);

              body = '';
              l2 = token.cells.length;
              for (j = 0; j < l2; j++) {
                row = token.tokens.cells[j];

                cell = '';
                l3 = row.length;
                for (k = 0; k < l3; k++) {
                  cell += this.renderer.tablecell(
                    this.parseInline(row[k]),
                    { header: false, align: token.align[k] }
                  );
                }

                body += this.renderer.tablerow(cell);
              }
              out += this.renderer.table(header, body);
              continue;
            }
            case 'blockquote': {
              body = this.parse(token.tokens);
              out += this.renderer.blockquote(body);
              continue;
            }
            case 'list': {
              ordered = token.ordered;
              start = token.start;
              loose = token.loose;
              l2 = token.items.length;

              body = '';
              for (j = 0; j < l2; j++) {
                item = token.items[j];
                checked = item.checked;
                task = item.task;

                itemBody = '';
                if (item.task) {
                  checkbox = this.renderer.checkbox(checked);
                  if (loose) {
                    if (item.tokens.length > 0 && item.tokens[0].type === 'text') {
                      item.tokens[0].text = checkbox + ' ' + item.tokens[0].text;
                      if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === 'text') {
                        item.tokens[0].tokens[0].text = checkbox + ' ' + item.tokens[0].tokens[0].text;
                      }
                    } else {
                      item.tokens.unshift({
                        type: 'text',
                        text: checkbox
                      });
                    }
                  } else {
                    itemBody += checkbox;
                  }
                }

                itemBody += this.parse(item.tokens, loose);
                body += this.renderer.listitem(itemBody, task, checked);
              }

              out += this.renderer.list(body, ordered, start);
              continue;
            }
            case 'html': {
              // TODO parse inline content if parameter markdown=1
              out += this.renderer.html(token.text);
              continue;
            }
            case 'paragraph': {
              out += this.renderer.paragraph(this.parseInline(token.tokens));
              continue;
            }
            case 'text': {
              body = token.tokens ? this.parseInline(token.tokens) : token.text;
              while (i + 1 < l && tokens[i + 1].type === 'text') {
                token = tokens[++i];
                body += '\n' + (token.tokens ? this.parseInline(token.tokens) : token.text);
              }
              out += top ? this.renderer.paragraph(body) : body;
              continue;
            }

            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }

        return out;
      }

      /**
       * Parse Inline Tokens
       */
      parseInline(tokens, renderer) {
        renderer = renderer || this.renderer;
        let out = '',
          i,
          token,
          ret;

        const l = tokens.length;
        for (i = 0; i < l; i++) {
          token = tokens[i];

          // Run any renderer extensions
          if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[token.type]) {
            ret = this.options.extensions.renderers[token.type].call(this, token);
            if (ret !== false || !['escape', 'html', 'link', 'image', 'strong', 'em', 'codespan', 'br', 'del', 'text'].includes(token.type)) {
              out += ret || '';
              continue;
            }
          }

          switch (token.type) {
            case 'escape': {
              out += renderer.text(token.text);
              break;
            }
            case 'html': {
              out += renderer.html(token.text);
              break;
            }
            case 'link': {
              out += renderer.link(token.href, token.title, this.parseInline(token.tokens, renderer));
              break;
            }
            case 'image': {
              out += renderer.image(token.href, token.title, token.text);
              break;
            }
            case 'strong': {
              out += renderer.strong(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'em': {
              out += renderer.em(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'codespan': {
              out += renderer.codespan(token.text);
              break;
            }
            case 'br': {
              out += renderer.br();
              break;
            }
            case 'del': {
              out += renderer.del(this.parseInline(token.tokens, renderer));
              break;
            }
            case 'text': {
              out += renderer.text(token.text);
              break;
            }
            default: {
              const errMsg = 'Token with "' + token.type + '" type was not found.';
              if (this.options.silent) {
                console.error(errMsg);
                return;
              } else {
                throw new Error(errMsg);
              }
            }
          }
        }
        return out;
      }
    };

    const Lexer$1 = Lexer_1;
    const Parser = Parser_1;
    const Tokenizer = Tokenizer_1;
    const Renderer = Renderer_1;
    const TextRenderer = TextRenderer_1;
    const Slugger$2 = Slugger_1;
    const {
      merge,
      checkSanitizeDeprecation,
      escape
    } = helpers;
    const {
      getDefaults,
      changeDefaults,
      defaults
    } = defaults$5.exports;

    /**
     * Marked
     */
    function marked(src, opt, callback) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked(): input parameter is undefined or null');
      }
      if (typeof src !== 'string') {
        throw new Error('marked(): input parameter is of type '
          + Object.prototype.toString.call(src) + ', string expected');
      }

      if (typeof opt === 'function') {
        callback = opt;
        opt = null;
      }

      opt = merge({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);

      if (callback) {
        const highlight = opt.highlight;
        let tokens;

        try {
          tokens = Lexer$1.lex(src, opt);
        } catch (e) {
          return callback(e);
        }

        const done = function(err) {
          let out;

          if (!err) {
            try {
              if (opt.walkTokens) {
                marked.walkTokens(tokens, opt.walkTokens);
              }
              out = Parser.parse(tokens, opt);
            } catch (e) {
              err = e;
            }
          }

          opt.highlight = highlight;

          return err
            ? callback(err)
            : callback(null, out);
        };

        if (!highlight || highlight.length < 3) {
          return done();
        }

        delete opt.highlight;

        if (!tokens.length) return done();

        let pending = 0;
        marked.walkTokens(tokens, function(token) {
          if (token.type === 'code') {
            pending++;
            setTimeout(() => {
              highlight(token.text, token.lang, function(err, code) {
                if (err) {
                  return done(err);
                }
                if (code != null && code !== token.text) {
                  token.text = code;
                  token.escaped = true;
                }

                pending--;
                if (pending === 0) {
                  done();
                }
              });
            }, 0);
          }
        });

        if (pending === 0) {
          done();
        }

        return;
      }

      try {
        const tokens = Lexer$1.lex(src, opt);
        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }
        return Parser.parse(tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';
        if (opt.silent) {
          return '<p>An error occurred:</p><pre>'
            + escape(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    }

    /**
     * Options
     */

    marked.options =
    marked.setOptions = function(opt) {
      merge(marked.defaults, opt);
      changeDefaults(marked.defaults);
      return marked;
    };

    marked.getDefaults = getDefaults;

    marked.defaults = defaults;

    /**
     * Use Extension
     */

    marked.use = function(...args) {
      const opts = merge({}, ...args);
      const extensions = marked.defaults.extensions || { renderers: {}, childTokens: {} };
      let hasExtensions;

      args.forEach((pack) => {
        // ==-- Parse "addon" extensions --== //
        if (pack.extensions) {
          hasExtensions = true;
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error('extension name required');
            }
            if (ext.renderer) { // Renderer extensions
              const prevRenderer = extensions.renderers ? extensions.renderers[ext.name] : null;
              if (prevRenderer) {
                // Replace extension with func to run new extension but fall back if false
                extensions.renderers[ext.name] = function(...args) {
                  let ret = ext.renderer.apply(this, args);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if (ext.tokenizer) { // Tokenizer Extensions
              if (!ext.level || (ext.level !== 'block' && ext.level !== 'inline')) {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              if (extensions[ext.level]) {
                extensions[ext.level].unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) { // Function to check for start of token
                if (ext.level === 'block') {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === 'inline') {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if (ext.childTokens) { // Child tokens to be visited by walkTokens
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
        }

        // ==-- Parse "overwrite" extensions --== //
        if (pack.renderer) {
          const renderer = marked.defaults.renderer || new Renderer();
          for (const prop in pack.renderer) {
            const prevRenderer = renderer[prop];
            // Replace renderer with func to run extension, but fall back if false
            renderer[prop] = (...args) => {
              let ret = pack.renderer[prop].apply(renderer, args);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args);
              }
              return ret;
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = marked.defaults.tokenizer || new Tokenizer();
          for (const prop in pack.tokenizer) {
            const prevTokenizer = tokenizer[prop];
            // Replace tokenizer with func to run extension, but fall back if false
            tokenizer[prop] = (...args) => {
              let ret = pack.tokenizer[prop].apply(tokenizer, args);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }

        // ==-- Parse WalkTokens extensions --== //
        if (pack.walkTokens) {
          const walkTokens = marked.defaults.walkTokens;
          opts.walkTokens = (token) => {
            pack.walkTokens.call(this, token);
            if (walkTokens) {
              walkTokens(token);
            }
          };
        }

        if (hasExtensions) {
          opts.extensions = extensions;
        }

        marked.setOptions(opts);
      });
    };

    /**
     * Run callback for every token
     */

    marked.walkTokens = function(tokens, callback) {
      for (const token of tokens) {
        callback(token);
        switch (token.type) {
          case 'table': {
            for (const cell of token.tokens.header) {
              marked.walkTokens(cell, callback);
            }
            for (const row of token.tokens.cells) {
              for (const cell of row) {
                marked.walkTokens(cell, callback);
              }
            }
            break;
          }
          case 'list': {
            marked.walkTokens(token.items, callback);
            break;
          }
          default: {
            if (marked.defaults.extensions && marked.defaults.extensions.childTokens && marked.defaults.extensions.childTokens[token.type]) { // Walk any extensions
              marked.defaults.extensions.childTokens[token.type].forEach(function(childTokens) {
                marked.walkTokens(token[childTokens], callback);
              });
            } else if (token.tokens) {
              marked.walkTokens(token.tokens, callback);
            }
          }
        }
      }
    };

    /**
     * Parse Inline
     */
    marked.parseInline = function(src, opt) {
      // throw error in case of non string input
      if (typeof src === 'undefined' || src === null) {
        throw new Error('marked.parseInline(): input parameter is undefined or null');
      }
      if (typeof src !== 'string') {
        throw new Error('marked.parseInline(): input parameter is of type '
          + Object.prototype.toString.call(src) + ', string expected');
      }

      opt = merge({}, marked.defaults, opt || {});
      checkSanitizeDeprecation(opt);

      try {
        const tokens = Lexer$1.lexInline(src, opt);
        if (opt.walkTokens) {
          marked.walkTokens(tokens, opt.walkTokens);
        }
        return Parser.parseInline(tokens, opt);
      } catch (e) {
        e.message += '\nPlease report this to https://github.com/markedjs/marked.';
        if (opt.silent) {
          return '<p>An error occurred:</p><pre>'
            + escape(e.message + '', true)
            + '</pre>';
        }
        throw e;
      }
    };

    /**
     * Expose
     */

    marked.Parser = Parser;
    marked.parser = Parser.parse;

    marked.Renderer = Renderer;
    marked.TextRenderer = TextRenderer;

    marked.Lexer = Lexer$1;
    marked.lexer = Lexer$1.lex;

    marked.Tokenizer = Tokenizer;

    marked.Slugger = Slugger$2;

    marked.parse = marked;

    var marked_1 = marked;

    const key = {};

    /* node_modules/svelte-markdown/src/renderers/Heading.svelte generated by Svelte v3.44.2 */
    const file$m = "node_modules/svelte-markdown/src/renderers/Heading.svelte";

    // (28:0) {:else}
    function create_else_block$4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text(/*raw*/ ctx[1]);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*raw*/ 2) set_data_dev(t, /*raw*/ ctx[1]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(28:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:22) 
    function create_if_block_5(ctx) {
    	let h6;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h6 = element("h6");
    			if (default_slot) default_slot.c();
    			attr_dev(h6, "id", /*id*/ ctx[2]);
    			add_location(h6, file$m, 26, 2, 596);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h6, anchor);

    			if (default_slot) {
    				default_slot.m(h6, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h6, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h6);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(26:22) ",
    		ctx
    	});

    	return block;
    }

    // (24:22) 
    function create_if_block_4(ctx) {
    	let h5;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h5 = element("h5");
    			if (default_slot) default_slot.c();
    			attr_dev(h5, "id", /*id*/ ctx[2]);
    			add_location(h5, file$m, 24, 2, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h5, anchor);

    			if (default_slot) {
    				default_slot.m(h5, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h5, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h5);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(24:22) ",
    		ctx
    	});

    	return block;
    }

    // (22:22) 
    function create_if_block_3(ctx) {
    	let h4;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			if (default_slot) default_slot.c();
    			attr_dev(h4, "id", /*id*/ ctx[2]);
    			add_location(h4, file$m, 22, 2, 490);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);

    			if (default_slot) {
    				default_slot.m(h4, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h4, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(22:22) ",
    		ctx
    	});

    	return block;
    }

    // (20:22) 
    function create_if_block_2(ctx) {
    	let h3;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			if (default_slot) default_slot.c();
    			attr_dev(h3, "id", /*id*/ ctx[2]);
    			add_location(h3, file$m, 20, 2, 437);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);

    			if (default_slot) {
    				default_slot.m(h3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h3, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(20:22) ",
    		ctx
    	});

    	return block;
    }

    // (18:22) 
    function create_if_block_1(ctx) {
    	let h2;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			if (default_slot) default_slot.c();
    			attr_dev(h2, "id", /*id*/ ctx[2]);
    			add_location(h2, file$m, 18, 2, 384);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);

    			if (default_slot) {
    				default_slot.m(h2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h2, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(18:22) ",
    		ctx
    	});

    	return block;
    }

    // (16:0) {#if depth === 1}
    function create_if_block$4(ctx) {
    	let h1;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[5].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			if (default_slot) default_slot.c();
    			attr_dev(h1, "id", /*id*/ ctx[2]);
    			add_location(h1, file$m, 16, 2, 331);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);

    			if (default_slot) {
    				default_slot.m(h1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*id*/ 4) {
    				attr_dev(h1, "id", /*id*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(16:0) {#if depth === 1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;

    	const if_block_creators = [
    		create_if_block$4,
    		create_if_block_1,
    		create_if_block_2,
    		create_if_block_3,
    		create_if_block_4,
    		create_if_block_5,
    		create_else_block$4
    	];

    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*depth*/ ctx[0] === 1) return 0;
    		if (/*depth*/ ctx[0] === 2) return 1;
    		if (/*depth*/ ctx[0] === 3) return 2;
    		if (/*depth*/ ctx[0] === 4) return 3;
    		if (/*depth*/ ctx[0] === 5) return 4;
    		if (/*depth*/ ctx[0] === 6) return 5;
    		return 6;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let id;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Heading', slots, ['default']);
    	let { depth } = $$props;
    	let { raw } = $$props;
    	let { text } = $$props;
    	const { slug, getOptions } = getContext(key);
    	const options = getOptions();
    	const writable_props = ['depth', 'raw', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Heading> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		key,
    		depth,
    		raw,
    		text,
    		slug,
    		getOptions,
    		options,
    		id
    	});

    	$$self.$inject_state = $$props => {
    		if ('depth' in $$props) $$invalidate(0, depth = $$props.depth);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('text' in $$props) $$invalidate(3, text = $$props.text);
    		if ('id' in $$props) $$invalidate(2, id = $$props.id);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*text*/ 8) {
    			$$invalidate(2, id = options.headerIds
    			? options.headerPrefix + slug(text)
    			: undefined);
    		}
    	};

    	return [depth, raw, id, text, $$scope, slots];
    }

    class Heading extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$p, create_fragment$p, safe_not_equal, { depth: 0, raw: 1, text: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Heading",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*depth*/ ctx[0] === undefined && !('depth' in props)) {
    			console.warn("<Heading> was created without expected prop 'depth'");
    		}

    		if (/*raw*/ ctx[1] === undefined && !('raw' in props)) {
    			console.warn("<Heading> was created without expected prop 'raw'");
    		}

    		if (/*text*/ ctx[3] === undefined && !('text' in props)) {
    			console.warn("<Heading> was created without expected prop 'text'");
    		}
    	}

    	get depth() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set depth(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get raw() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Heading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Heading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Paragraph.svelte generated by Svelte v3.44.2 */

    const file$l = "node_modules/svelte-markdown/src/renderers/Paragraph.svelte";

    function create_fragment$o(ctx) {
    	let p;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			p = element("p");
    			if (default_slot) default_slot.c();
    			add_location(p, file$l, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);

    			if (default_slot) {
    				default_slot.m(p, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Paragraph', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Paragraph> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Paragraph extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$o, create_fragment$o, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Paragraph",
    			options,
    			id: create_fragment$o.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Text.svelte generated by Svelte v3.44.2 */

    function create_fragment$n(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Text', slots, ['default']);
    	let { text } = $$props;
    	let { raw } = $$props;
    	const writable_props = ['text', 'raw'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Text> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ text, raw });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    		if ('raw' in $$props) $$invalidate(1, raw = $$props.raw);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text, raw, $$scope, slots];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$n, create_fragment$n, safe_not_equal, { text: 0, raw: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<Text> was created without expected prop 'text'");
    		}

    		if (/*raw*/ ctx[1] === undefined && !('raw' in props)) {
    			console.warn("<Text> was created without expected prop 'raw'");
    		}
    	}

    	get text() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get raw() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Image.svelte generated by Svelte v3.44.2 */

    const file$k = "node_modules/svelte-markdown/src/renderers/Image.svelte";

    function create_fragment$m(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "title", /*title*/ ctx[1]);
    			attr_dev(img, "alt", /*text*/ ctx[2]);
    			add_location(img, file$k, 6, 0, 97);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*href*/ 1 && !src_url_equal(img.src, img_src_value = /*href*/ ctx[0])) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*title*/ 2) {
    				attr_dev(img, "title", /*title*/ ctx[1]);
    			}

    			if (dirty & /*text*/ 4) {
    				attr_dev(img, "alt", /*text*/ ctx[2]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Image', slots, []);
    	let { href = '' } = $$props;
    	let { title = undefined } = $$props;
    	let { text = '' } = $$props;
    	const writable_props = ['href', 'title', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Image> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ href, title, text });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('text' in $$props) $$invalidate(2, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, title, text];
    }

    class Image$1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$m, create_fragment$m, safe_not_equal, { href: 0, title: 1, text: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Image",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get href() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Image>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Image>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Link.svelte generated by Svelte v3.44.2 */

    const file$j = "node_modules/svelte-markdown/src/renderers/Link.svelte";

    function create_fragment$l(ctx) {
    	let a;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			attr_dev(a, "href", /*href*/ ctx[0]);
    			attr_dev(a, "title", /*title*/ ctx[1]);
    			add_location(a, file$j, 5, 0, 74);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*href*/ 1) {
    				attr_dev(a, "href", /*href*/ ctx[0]);
    			}

    			if (!current || dirty & /*title*/ 2) {
    				attr_dev(a, "title", /*title*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { href = '' } = $$props;
    	let { title = undefined } = $$props;
    	const writable_props = ['href', 'title'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Link> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ href, title });

    	$$self.$inject_state = $$props => {
    		if ('href' in $$props) $$invalidate(0, href = $$props.href);
    		if ('title' in $$props) $$invalidate(1, title = $$props.title);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [href, title, $$scope, slots];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$l, create_fragment$l, safe_not_equal, { href: 0, title: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get href() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set href(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get title() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Em.svelte generated by Svelte v3.44.2 */

    const file$i = "node_modules/svelte-markdown/src/renderers/Em.svelte";

    function create_fragment$k(ctx) {
    	let em;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			em = element("em");
    			if (default_slot) default_slot.c();
    			add_location(em, file$i, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, em, anchor);

    			if (default_slot) {
    				default_slot.m(em, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(em);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Em', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Em> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Em extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Em",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Del.svelte generated by Svelte v3.44.2 */

    const file$h = "node_modules/svelte-markdown/src/renderers/Del.svelte";

    function create_fragment$j(ctx) {
    	let del;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			del = element("del");
    			if (default_slot) default_slot.c();
    			add_location(del, file$h, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, del, anchor);

    			if (default_slot) {
    				default_slot.m(del, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(del);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Del', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Del> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Del extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Del",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Codespan.svelte generated by Svelte v3.44.2 */

    const file$g = "node_modules/svelte-markdown/src/renderers/Codespan.svelte";

    function create_fragment$i(ctx) {
    	let code;
    	let t_value = /*raw*/ ctx[0].replace(/`/g, '') + "";
    	let t;

    	const block = {
    		c: function create() {
    			code = element("code");
    			t = text(t_value);
    			add_location(code, file$g, 4, 0, 37);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, code, anchor);
    			append_dev(code, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*raw*/ 1 && t_value !== (t_value = /*raw*/ ctx[0].replace(/`/g, '') + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(code);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Codespan', slots, []);
    	let { raw } = $$props;
    	const writable_props = ['raw'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Codespan> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
    	};

    	$$self.$capture_state = () => ({ raw });

    	$$self.$inject_state = $$props => {
    		if ('raw' in $$props) $$invalidate(0, raw = $$props.raw);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [raw];
    }

    class Codespan extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$i, create_fragment$i, safe_not_equal, { raw: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Codespan",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*raw*/ ctx[0] === undefined && !('raw' in props)) {
    			console.warn("<Codespan> was created without expected prop 'raw'");
    		}
    	}

    	get raw() {
    		throw new Error("<Codespan>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set raw(value) {
    		throw new Error("<Codespan>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Strong.svelte generated by Svelte v3.44.2 */

    const file$f = "node_modules/svelte-markdown/src/renderers/Strong.svelte";

    function create_fragment$h(ctx) {
    	let strong;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			strong = element("strong");
    			if (default_slot) default_slot.c();
    			add_location(strong, file$f, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, strong, anchor);

    			if (default_slot) {
    				default_slot.m(strong, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(strong);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Strong', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Strong> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Strong extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$h, create_fragment$h, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Strong",
    			options,
    			id: create_fragment$h.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Table.svelte generated by Svelte v3.44.2 */

    const file$e = "node_modules/svelte-markdown/src/renderers/Table.svelte";

    function create_fragment$g(ctx) {
    	let table;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			table = element("table");
    			if (default_slot) default_slot.c();
    			add_location(table, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, table, anchor);

    			if (default_slot) {
    				default_slot.m(table, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(table);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Table', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Table> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Table extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$g, create_fragment$g, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Table",
    			options,
    			id: create_fragment$g.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableHead.svelte generated by Svelte v3.44.2 */

    const file$d = "node_modules/svelte-markdown/src/renderers/TableHead.svelte";

    function create_fragment$f(ctx) {
    	let thead;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			thead = element("thead");
    			if (default_slot) default_slot.c();
    			add_location(thead, file$d, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, thead, anchor);

    			if (default_slot) {
    				default_slot.m(thead, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(thead);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableHead', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableHead> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableHead extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$f, create_fragment$f, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableHead",
    			options,
    			id: create_fragment$f.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableBody.svelte generated by Svelte v3.44.2 */

    const file$c = "node_modules/svelte-markdown/src/renderers/TableBody.svelte";

    function create_fragment$e(ctx) {
    	let tbody;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			tbody = element("tbody");
    			if (default_slot) default_slot.c();
    			add_location(tbody, file$c, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tbody, anchor);

    			if (default_slot) {
    				default_slot.m(tbody, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tbody);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableBody', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableBody> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableBody extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$e, create_fragment$e, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableBody",
    			options,
    			id: create_fragment$e.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableRow.svelte generated by Svelte v3.44.2 */

    const file$b = "node_modules/svelte-markdown/src/renderers/TableRow.svelte";

    function create_fragment$d(ctx) {
    	let tr;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			tr = element("tr");
    			if (default_slot) default_slot.c();
    			add_location(tr, file$b, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, tr, anchor);

    			if (default_slot) {
    				default_slot.m(tr, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(tr);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableRow', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableRow> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class TableRow extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableRow",
    			options,
    			id: create_fragment$d.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/TableCell.svelte generated by Svelte v3.44.2 */

    const file$a = "node_modules/svelte-markdown/src/renderers/TableCell.svelte";

    // (8:0) {:else}
    function create_else_block$3(ctx) {
    	let td;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			td = element("td");
    			if (default_slot) default_slot.c();
    			attr_dev(td, "align", /*align*/ ctx[1]);
    			add_location(td, file$a, 8, 2, 115);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, td, anchor);

    			if (default_slot) {
    				default_slot.m(td, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*align*/ 2) {
    				attr_dev(td, "align", /*align*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(td);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(8:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if header}
    function create_if_block$3(ctx) {
    	let th;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			th = element("th");
    			if (default_slot) default_slot.c();
    			attr_dev(th, "align", /*align*/ ctx[1]);
    			add_location(th, file$a, 6, 2, 74);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, th, anchor);

    			if (default_slot) {
    				default_slot.m(th, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*align*/ 2) {
    				attr_dev(th, "align", /*align*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(th);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(6:0) {#if header}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*header*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TableCell', slots, ['default']);
    	let { header } = $$props;
    	let { align } = $$props;
    	const writable_props = ['header', 'align'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TableCell> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('align' in $$props) $$invalidate(1, align = $$props.align);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ header, align });

    	$$self.$inject_state = $$props => {
    		if ('header' in $$props) $$invalidate(0, header = $$props.header);
    		if ('align' in $$props) $$invalidate(1, align = $$props.align);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [header, align, $$scope, slots];
    }

    class TableCell extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { header: 0, align: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TableCell",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*header*/ ctx[0] === undefined && !('header' in props)) {
    			console.warn("<TableCell> was created without expected prop 'header'");
    		}

    		if (/*align*/ ctx[1] === undefined && !('align' in props)) {
    			console.warn("<TableCell> was created without expected prop 'align'");
    		}
    	}

    	get header() {
    		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set header(value) {
    		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get align() {
    		throw new Error("<TableCell>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set align(value) {
    		throw new Error("<TableCell>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/List.svelte generated by Svelte v3.44.2 */

    const file$9 = "node_modules/svelte-markdown/src/renderers/List.svelte";

    // (8:0) {:else}
    function create_else_block$2(ctx) {
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			add_location(ul, file$9, 8, 2, 117);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(8:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if ordered}
    function create_if_block$2(ctx) {
    	let ol;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[2], null);

    	const block = {
    		c: function create() {
    			ol = element("ol");
    			if (default_slot) default_slot.c();
    			attr_dev(ol, "start", /*start*/ ctx[1]);
    			add_location(ol, file$9, 6, 2, 76);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ol, anchor);

    			if (default_slot) {
    				default_slot.m(ol, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 4)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[2],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[2])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[2], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*start*/ 2) {
    				attr_dev(ol, "start", /*start*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ol);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(6:0) {#if ordered}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$2, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*ordered*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('List', slots, ['default']);
    	let { ordered } = $$props;
    	let { start } = $$props;
    	const writable_props = ['ordered', 'start'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<List> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    		if ('$$scope' in $$props) $$invalidate(2, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ ordered, start });

    	$$self.$inject_state = $$props => {
    		if ('ordered' in $$props) $$invalidate(0, ordered = $$props.ordered);
    		if ('start' in $$props) $$invalidate(1, start = $$props.start);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [ordered, start, $$scope, slots];
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$b, safe_not_equal, { ordered: 0, start: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "List",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*ordered*/ ctx[0] === undefined && !('ordered' in props)) {
    			console.warn("<List> was created without expected prop 'ordered'");
    		}

    		if (/*start*/ ctx[1] === undefined && !('start' in props)) {
    			console.warn("<List> was created without expected prop 'start'");
    		}
    	}

    	get ordered() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ordered(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get start() {
    		throw new Error("<List>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set start(value) {
    		throw new Error("<List>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/ListItem.svelte generated by Svelte v3.44.2 */

    const file$8 = "node_modules/svelte-markdown/src/renderers/ListItem.svelte";

    function create_fragment$a(ctx) {
    	let li;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			if (default_slot) default_slot.c();
    			add_location(li, file$8, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ListItem', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ListItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class ListItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ListItem",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Hr.svelte generated by Svelte v3.44.2 */

    const file$7 = "node_modules/svelte-markdown/src/renderers/Hr.svelte";

    function create_fragment$9(ctx) {
    	let hr;

    	const block = {
    		c: function create() {
    			hr = element("hr");
    			add_location(hr, file$7, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, hr, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(hr);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hr', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hr> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Hr extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hr",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Html.svelte generated by Svelte v3.44.2 */

    function create_fragment$8(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag();
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(/*text*/ ctx[0], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 1) html_tag.p(/*text*/ ctx[0]);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Html', slots, []);
    	let { text } = $$props;
    	const writable_props = ['text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Html> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ text });

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(0, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [text];
    }

    class Html extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { text: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Html",
    			options,
    			id: create_fragment$8.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*text*/ ctx[0] === undefined && !('text' in props)) {
    			console.warn("<Html> was created without expected prop 'text'");
    		}
    	}

    	get text() {
    		throw new Error("<Html>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Html>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Blockquote.svelte generated by Svelte v3.44.2 */

    const file$6 = "node_modules/svelte-markdown/src/renderers/Blockquote.svelte";

    function create_fragment$7(ctx) {
    	let blockquote;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			blockquote = element("blockquote");
    			if (default_slot) default_slot.c();
    			add_location(blockquote, file$6, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, blockquote, anchor);

    			if (default_slot) {
    				default_slot.m(blockquote, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(blockquote);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Blockquote', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Blockquote> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Blockquote extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Blockquote",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Code.svelte generated by Svelte v3.44.2 */

    const file$5 = "node_modules/svelte-markdown/src/renderers/Code.svelte";

    function create_fragment$6(ctx) {
    	let pre;
    	let code;
    	let t;

    	const block = {
    		c: function create() {
    			pre = element("pre");
    			code = element("code");
    			t = text(/*text*/ ctx[1]);
    			add_location(code, file$5, 5, 18, 74);
    			attr_dev(pre, "class", /*lang*/ ctx[0]);
    			add_location(pre, file$5, 5, 0, 56);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, pre, anchor);
    			append_dev(pre, code);
    			append_dev(code, t);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*text*/ 2) set_data_dev(t, /*text*/ ctx[1]);

    			if (dirty & /*lang*/ 1) {
    				attr_dev(pre, "class", /*lang*/ ctx[0]);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(pre);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Code', slots, []);
    	let { lang } = $$props;
    	let { text } = $$props;
    	const writable_props = ['lang', 'text'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Code> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	$$self.$capture_state = () => ({ lang, text });

    	$$self.$inject_state = $$props => {
    		if ('lang' in $$props) $$invalidate(0, lang = $$props.lang);
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [lang, text];
    }

    class Code extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { lang: 0, text: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Code",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*lang*/ ctx[0] === undefined && !('lang' in props)) {
    			console.warn("<Code> was created without expected prop 'lang'");
    		}

    		if (/*text*/ ctx[1] === undefined && !('text' in props)) {
    			console.warn("<Code> was created without expected prop 'text'");
    		}
    	}

    	get lang() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set lang(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Code>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Code>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-markdown/src/renderers/Br.svelte generated by Svelte v3.44.2 */

    const file$4 = "node_modules/svelte-markdown/src/renderers/Br.svelte";

    function create_fragment$5(ctx) {
    	let br;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			br = element("br");
    			if (default_slot) default_slot.c();
    			add_location(br, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, br, anchor);

    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 1)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[0],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[0])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[0], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(br);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Br', slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Br> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('$$scope' in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class Br extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Br",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    const defaultRenderers = {
      heading: Heading,
      paragraph: Paragraph,
      text: Text,
      image: Image$1,
      link: Link,
      em: Em,
      strong: Strong,
      codespan: Codespan,
      del: Del,
      table: Table,
      tablehead: TableHead,
      tablebody: TableBody,
      tablerow: TableRow,
      tablecell: TableCell,
      list: List,
      orderedlistitem: null,
      unorderedlistitem: null,
      listitem: ListItem,
      hr: Hr,
      html: Html,
      blockquote: Blockquote,
      code: Code,
      br: Br,
    };
    const defaultOptions = {
      baseUrl: null,
      breaks: false,
      gfm: true,
      headerIds: true,
      headerPrefix: '',
      highlight: null,
      langPrefix: 'language-',
      mangle: true,
      pedantic: false,
      renderer: null,
      sanitize: false,
      sanitizer: null,
      silent: false,
      smartLists: false,
      smartypants: false,
      tokenizer: null,
      xhtml: false,
    };

    const Lexer = marked_1.Lexer;
    const Slugger = marked_1.Slugger;

    /* node_modules/svelte-markdown/src/SvelteMarkdown.svelte generated by Svelte v3.44.2 */

    function create_fragment$4(ctx) {
    	let parser;
    	let current;

    	parser = new Parser$1({
    			props: {
    				tokens: /*tokens*/ ctx[0],
    				renderers: /*combinedRenderers*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parser.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(parser, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const parser_changes = {};
    			if (dirty & /*tokens*/ 1) parser_changes.tokens = /*tokens*/ ctx[0];
    			if (dirty & /*combinedRenderers*/ 2) parser_changes.renderers = /*combinedRenderers*/ ctx[1];
    			parser.$set(parser_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parser.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parser.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parser, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let slugger;
    	let combinedOptions;
    	let combinedRenderers;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SvelteMarkdown', slots, []);
    	let { source = '' } = $$props;
    	let { renderers = {} } = $$props;
    	let { options = {} } = $$props;
    	let { isInline = false } = $$props;
    	const dispatch = createEventDispatcher();
    	let tokens;
    	let lexer;
    	let mounted;

    	setContext(key, {
    		slug: val => slugger ? slugger.slug(val) : '',
    		getOptions: () => combinedOptions
    	});

    	onMount(() => {
    		$$invalidate(7, mounted = true);
    	});

    	const writable_props = ['source', 'renderers', 'options', 'isInline'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SvelteMarkdown> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('source' in $$props) $$invalidate(2, source = $$props.source);
    		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		createEventDispatcher,
    		onMount,
    		Parser: Parser$1,
    		Lexer,
    		Slugger,
    		defaultOptions,
    		defaultRenderers,
    		key,
    		source,
    		renderers,
    		options,
    		isInline,
    		dispatch,
    		tokens,
    		lexer,
    		mounted,
    		combinedOptions,
    		slugger,
    		combinedRenderers
    	});

    	$$self.$inject_state = $$props => {
    		if ('source' in $$props) $$invalidate(2, source = $$props.source);
    		if ('renderers' in $$props) $$invalidate(3, renderers = $$props.renderers);
    		if ('options' in $$props) $$invalidate(4, options = $$props.options);
    		if ('isInline' in $$props) $$invalidate(5, isInline = $$props.isInline);
    		if ('tokens' in $$props) $$invalidate(0, tokens = $$props.tokens);
    		if ('lexer' in $$props) $$invalidate(6, lexer = $$props.lexer);
    		if ('mounted' in $$props) $$invalidate(7, mounted = $$props.mounted);
    		if ('combinedOptions' in $$props) $$invalidate(8, combinedOptions = $$props.combinedOptions);
    		if ('slugger' in $$props) slugger = $$props.slugger;
    		if ('combinedRenderers' in $$props) $$invalidate(1, combinedRenderers = $$props.combinedRenderers);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*source*/ 4) {
    			slugger = source ? new Slugger() : undefined;
    		}

    		if ($$self.$$.dirty & /*options*/ 16) {
    			$$invalidate(8, combinedOptions = { ...defaultOptions, ...options });
    		}

    		if ($$self.$$.dirty & /*combinedOptions, isInline, lexer, source, tokens*/ 357) {
    			{
    				$$invalidate(6, lexer = new Lexer(combinedOptions));

    				$$invalidate(0, tokens = isInline
    				? lexer.inlineTokens(source)
    				: lexer.lex(source));

    				dispatch('parsed', { tokens });
    			}
    		}

    		if ($$self.$$.dirty & /*renderers*/ 8) {
    			$$invalidate(1, combinedRenderers = { ...defaultRenderers, ...renderers });
    		}

    		if ($$self.$$.dirty & /*mounted, tokens*/ 129) {
    			mounted && dispatch('parsed', { tokens });
    		}
    	};

    	return [
    		tokens,
    		combinedRenderers,
    		source,
    		renderers,
    		options,
    		isInline,
    		lexer,
    		mounted,
    		combinedOptions
    	];
    }

    class SvelteMarkdown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			source: 2,
    			renderers: 3,
    			options: 4,
    			isInline: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SvelteMarkdown",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get source() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set source(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get renderers() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set renderers(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get isInline() {
    		throw new Error("<SvelteMarkdown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set isInline(value) {
    		throw new Error("<SvelteMarkdown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/pages/Page.svelte generated by Svelte v3.44.2 */
    const file$3 = "src/pages/Page.svelte";

    // (10:4) {:else}
    function create_else_block$1(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "404";
    			add_location(h1, file$3, 10, 8, 316);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(10:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (8:4) {#if content}
    function create_if_block$1(ctx) {
    	let sveltemarkdown;
    	let current;

    	sveltemarkdown = new SvelteMarkdown({
    			props: { source: /*content*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(sveltemarkdown.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(sveltemarkdown, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const sveltemarkdown_changes = {};
    			if (dirty & /*content*/ 1) sveltemarkdown_changes.source = /*content*/ ctx[0];
    			sveltemarkdown.$set(sveltemarkdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(sveltemarkdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(sveltemarkdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(sveltemarkdown, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(8:4) {#if content}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let article;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*content*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			article = element("article");
    			if_block.c();
    			add_location(article, file$3, 6, 0, 224);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			if_blocks[current_block_type_index].m(article, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(article, null);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let content;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Page', slots, []);
    	let { id = null } = $$props;
    	let { pages = [] } = $$props;
    	const writable_props = ['id', 'pages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Page> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('id' in $$props) $$invalidate(1, id = $$props.id);
    		if ('pages' in $$props) $$invalidate(2, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({ SvelteMarkdown, id, pages, content });

    	$$self.$inject_state = $$props => {
    		if ('id' in $$props) $$invalidate(1, id = $$props.id);
    		if ('pages' in $$props) $$invalidate(2, pages = $$props.pages);
    		if ('content' in $$props) $$invalidate(0, content = $$props.content);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*pages, id*/ 6) {
    			$$invalidate(0, content = pages.find(i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === id)?.content);
    		}
    	};

    	return [content, id, pages];
    }

    class Page extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { id: 1, pages: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Page",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get id() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set id(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pages() {
    		throw new Error("<Page>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Page>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/partials/Hero.svelte generated by Svelte v3.44.2 */

    const file$2 = "src/partials/Hero.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			attr_dev(img, "alt", "banner");
    			if (!src_url_equal(img.src, img_src_value = "/assets/banner.png")) attr_dev(img, "src", img_src_value);
    			add_location(img, file$2, 5, 4, 235);
    			attr_dev(div, "id", "hero");
    			attr_dev(div, "class", "flex");
    			add_location(div, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src/pages/Home.svelte generated by Svelte v3.44.2 */
    const file$1 = "src/pages/Home.svelte";

    function create_fragment$1(ctx) {
    	let article;
    	let hero;
    	let t0;
    	let sveltemarkdown;
    	let t1;
    	let button;
    	let current;
    	hero = new Hero({ $$inline: true });

    	sveltemarkdown = new SvelteMarkdown({
    			props: {
    				source: /*pages*/ ctx[0].find(/*func*/ ctx[1]).content
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			article = element("article");
    			create_component(hero.$$.fragment);
    			t0 = space();
    			create_component(sveltemarkdown.$$.fragment);
    			t1 = space();
    			button = element("button");
    			button.textContent = "Get Involved";
    			attr_dev(button, "class", "btn-primary active");
    			add_location(button, file$1, 13, 1, 322);
    			add_location(article, file$1, 10, 0, 179);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, article, anchor);
    			mount_component(hero, article, null);
    			append_dev(article, t0);
    			mount_component(sveltemarkdown, article, null);
    			append_dev(article, t1);
    			append_dev(article, button);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const sveltemarkdown_changes = {};
    			if (dirty & /*pages*/ 1) sveltemarkdown_changes.source = /*pages*/ ctx[0].find(/*func*/ ctx[1]).content;
    			sveltemarkdown.$set(sveltemarkdown_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(sveltemarkdown.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(sveltemarkdown.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(article);
    			destroy_component(hero);
    			destroy_component(sveltemarkdown);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	let { pages = [] } = $$props;
    	const writable_props = ['pages'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	const func = i => i.title.toLowerCase().replace(new RegExp(" ", "g"), '-') === 'home';

    	$$self.$$set = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	$$self.$capture_state = () => ({ Link: Link$1, SvelteMarkdown, Hero, pages });

    	$$self.$inject_state = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, func];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { pages: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get pages() {
    		throw new Error("<Home>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pages(value) {
    		throw new Error("<Home>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/App.svelte generated by Svelte v3.44.2 */
    const file = "src/App.svelte";

    // (32:1) {:else}
    function create_else_block(ctx) {
    	let div1;
    	let header;
    	let t0;
    	let div0;
    	let sidebar;
    	let t1;
    	let route0;
    	let t2;
    	let route1;
    	let t3;
    	let route2;
    	let t4;
    	let route3;
    	let t5;
    	let div2;
    	let footer;
    	let current;
    	header = new Header({ $$inline: true });
    	sidebar = new Sidebar({ $$inline: true });

    	route0 = new Route({
    			props: {
    				path: "/pages/contact",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route1 = new Route({
    			props: {
    				path: "/pages/live",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route2 = new Route({
    			props: {
    				path: "/pages/:id",
    				$$slots: {
    					default: [
    						create_default_slot_2,
    						({ params }) => ({ 4: params }),
    						({ params }) => params ? 16 : 0
    					]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	route3 = new Route({
    			props: {
    				path: "/",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			create_component(header.$$.fragment);
    			t0 = space();
    			div0 = element("div");
    			create_component(sidebar.$$.fragment);
    			t1 = space();
    			create_component(route0.$$.fragment);
    			t2 = space();
    			create_component(route1.$$.fragment);
    			t3 = space();
    			create_component(route2.$$.fragment);
    			t4 = space();
    			create_component(route3.$$.fragment);
    			t5 = space();
    			div2 = element("div");
    			create_component(footer.$$.fragment);
    			attr_dev(div0, "id", "content");
    			attr_dev(div0, "class", "flex");
    			add_location(div0, file, 34, 3, 1029);
    			attr_dev(div1, "class", "wrapper");
    			add_location(div1, file, 32, 2, 991);
    			attr_dev(div2, "class", "wrapper");
    			add_location(div2, file, 44, 2, 1340);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			mount_component(header, div1, null);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			mount_component(sidebar, div0, null);
    			append_dev(div0, t1);
    			mount_component(route0, div0, null);
    			append_dev(div0, t2);
    			mount_component(route1, div0, null);
    			append_dev(div0, t3);
    			mount_component(route2, div0, null);
    			append_dev(div0, t4);
    			mount_component(route3, div0, null);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div2, anchor);
    			mount_component(footer, div2, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const route0_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				route0_changes.$$scope = { dirty, ctx };
    			}

    			route0.$set(route0_changes);
    			const route1_changes = {};

    			if (dirty & /*$$scope*/ 32) {
    				route1_changes.$$scope = { dirty, ctx };
    			}

    			route1.$set(route1_changes);
    			const route2_changes = {};

    			if (dirty & /*$$scope, pages, params*/ 49) {
    				route2_changes.$$scope = { dirty, ctx };
    			}

    			route2.$set(route2_changes);
    			const route3_changes = {};

    			if (dirty & /*$$scope, pages*/ 33) {
    				route3_changes.$$scope = { dirty, ctx };
    			}

    			route3.$set(route3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(sidebar.$$.fragment, local);
    			transition_in(route0.$$.fragment, local);
    			transition_in(route1.$$.fragment, local);
    			transition_in(route2.$$.fragment, local);
    			transition_in(route3.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(sidebar.$$.fragment, local);
    			transition_out(route0.$$.fragment, local);
    			transition_out(route1.$$.fragment, local);
    			transition_out(route2.$$.fragment, local);
    			transition_out(route3.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(header);
    			destroy_component(sidebar);
    			destroy_component(route0);
    			destroy_component(route1);
    			destroy_component(route2);
    			destroy_component(route3);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div2);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(32:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (28:1) {#if loading}
    function create_if_block(ctx) {
    	let div1;
    	let div0;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			div0.textContent = "Loading...";
    			attr_dev(div0, "class", "loader");
    			add_location(div0, file, 29, 3, 934);
    			attr_dev(div1, "class", "flex");
    			attr_dev(div1, "id", "loading");
    			add_location(div1, file, 28, 2, 899);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(28:1) {#if loading}",
    		ctx
    	});

    	return block;
    }

    // (37:4) <Route path="/pages/contact">
    function create_default_slot_4(ctx) {
    	let contact;
    	let current;
    	contact = new Contact({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(contact.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contact, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contact, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(37:4) <Route path=\\\"/pages/contact\\\">",
    		ctx
    	});

    	return block;
    }

    // (38:4) <Route path="/pages/live">
    function create_default_slot_3(ctx) {
    	let live;
    	let current;
    	live = new Live({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(live.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(live, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(live.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(live.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(live, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(38:4) <Route path=\\\"/pages/live\\\">",
    		ctx
    	});

    	return block;
    }

    // (39:4) <Route path="/pages/:id" let:params>
    function create_default_slot_2(ctx) {
    	let page;
    	let current;
    	const page_spread_levels = [{ pages: /*pages*/ ctx[0] }, /*params*/ ctx[4]];
    	let page_props = {};

    	for (let i = 0; i < page_spread_levels.length; i += 1) {
    		page_props = assign(page_props, page_spread_levels[i]);
    	}

    	page = new Page({ props: page_props, $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(page.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(page, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const page_changes = (dirty & /*pages, params*/ 17)
    			? get_spread_update(page_spread_levels, [
    					dirty & /*pages*/ 1 && { pages: /*pages*/ ctx[0] },
    					dirty & /*params*/ 16 && get_spread_object(/*params*/ ctx[4])
    				])
    			: {};

    			page.$set(page_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(page.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(page.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(page, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(39:4) <Route path=\\\"/pages/:id\\\" let:params>",
    		ctx
    	});

    	return block;
    }

    // (42:4) <Route path="/">
    function create_default_slot_1(ctx) {
    	let home;
    	let current;

    	home = new Home({
    			props: { pages: /*pages*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(home.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(home, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const home_changes = {};
    			if (dirty & /*pages*/ 1) home_changes.pages = /*pages*/ ctx[0];
    			home.$set(home_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(home.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(home.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(home, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(42:4) <Route path=\\\"/\\\">",
    		ctx
    	});

    	return block;
    }

    // (27:0) <Router>
    function create_default_slot(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*loading*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(27:0) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(router.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(router, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope, loading, pages*/ 35) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(router, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let pages = [];
    	let posts = [];
    	let loading = true;

    	async function fetchData() {
    		$$invalidate(0, pages = await fetch(`${window.BASE_URL}/pages`).then(response => response.json()).then(response => response.filter(i => i.website === 'webtv')));
    		posts = await fetch(`${window.BASE_URL}/posts`).then(response => response.json()).then(response => response.filter(i => i.website === 'webtv'));
    		$$invalidate(1, loading = false);
    	}

    	onMount(async () => {
    		fetchData();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		Link: Link$1,
    		Route,
    		Header,
    		Footer,
    		Sidebar,
    		Contact,
    		Live,
    		Page,
    		Home,
    		onMount,
    		pages,
    		posts,
    		loading,
    		fetchData
    	});

    	$$self.$inject_state = $$props => {
    		if ('pages' in $$props) $$invalidate(0, pages = $$props.pages);
    		if ('posts' in $$props) posts = $$props.posts;
    		if ('loading' in $$props) $$invalidate(1, loading = $$props.loading);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [pages, loading];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    var app = new App({
    	target: document.body
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
