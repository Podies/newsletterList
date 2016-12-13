import sequence from './promiseUtils';

export default function fetchComponentData(store, components, params, query) {
  const needs = components.reduce((prev, current) =>
    (current.need || [])
      .concat((current.WrappedComponent && (current.WrappedComponent.need !== current.need) ?
        current.WrappedComponent.need : []) || [])
        .concat(prev)
  , []);

  return sequence(needs, need => store.dispatch(need(params, store.getState(), query)));
}