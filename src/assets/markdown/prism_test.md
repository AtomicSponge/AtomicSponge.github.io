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
template <> inline benchmark<std::chrono::microseconds>::benchmark(const std::string& label) :
benchmark_label(label), time_label("microseconds") {};
{% endhighlight %}

Done!
