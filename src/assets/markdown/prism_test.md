## Prism Test

This is an IIFE:

{% highlight language-javascript %}
(() => {
  console.log(`Hello from the IIFE!`)
  if(true) {
    function()
  } else {
    throw new Error('whoops!')
  }
})()
{% endhighlight %}

This is some C++

{% highlight language-cpp %}
bool world::delete_entity(const entity_id& e_id) {
  auto e_it = std::find_if(entity_vec.begin(), entity_vec.end(),
                           [&e_id](const entity& e){ return e.first == e_id; });
  if(e_it == entity_vec.end()) return false;

  _world.erase(e_id);      //  Remove all associated componenets.
  entity_vec.erase(e_it);  //  Delete the entity.

  return true;
}
{% endhighlight %}

Done!
