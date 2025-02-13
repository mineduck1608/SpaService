import React from 'react'
import seperator from '../../images/serviceBg/separator.png'

export default function ServiceIntro() {
  return (
    <div>
      <p className='p-3 text-center text-2xl font-bold'>Service introduction</p>
      <div className='mb-4 flex justify-center'>
        <img src={seperator} />
      </div>
      {/* Sample text */}
      <div>
        <div id='lipsum'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque id neque ultrices, ullamcorper diam id,
            porta libero. Nulla pellentesque fermentum egestas. Ut ultrices, justo et vehicula tempus, enim tellus
            mollis ligula, quis luctus sapien est vitae dui. Proin consectetur, nunc non varius hendrerit, lacus nibh
            tincidunt nibh, feugiat dictum elit dolor in tortor. Nullam aliquet magna ut sapien egestas, vel hendrerit
            arcu facilisis. Mauris nec arcu non lectus tempor posuere ac sit amet est. Nam euismod lacus at libero
            rhoncus ultricies. Maecenas ipsum massa, tempor sit amet sagittis tempus, suscipit in urna. Vestibulum at
            purus nisi. Praesent diam ligula, consequat non nunc eget, mattis maximus est. Proin cursus, quam a
            consequat mollis, nisl risus congue eros, eget finibus sem tortor et dolor. Quisque sit amet tempor felis,
            eget auctor sapien. Suspendisse molestie eleifend diam ut ullamcorper. Proin ac ultrices nisi, at euismod
            leo.
          </p>
          <p>
            Fusce id tellus congue, dapibus enim id, sodales metus. Nunc hendrerit leo nec convallis facilisis. Fusce
            consectetur tellus eu dolor interdum, ac mattis dolor malesuada. Sed luctus nulla id sem mollis, in finibus
            nunc fermentum. Nunc id mollis ipsum. In ac velit lobortis, hendrerit elit non, vulputate tortor. Aliquam
            sodales at nisi id sodales. Phasellus congue nunc id sollicitudin sodales. Proin nec lectus a nisi porta
            venenatis.
          </p>
          <p>
            Proin sit amet semper libero. Praesent in turpis lorem. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent pulvinar nisl nec odio placerat vestibulum. Curabitur
            sodales libero nec aliquam pretium. Duis ac lobortis metus. Mauris neque nisi, imperdiet vitae dignissim
            nec, commodo at eros. Nam vel ultrices mauris. Donec urna justo, vulputate sit amet euismod ac, pulvinar
            convallis ipsum. Sed in dui leo. In hac habitasse platea dictumst. Fusce vestibulum tempus ipsum, in
            convallis diam vulputate ac. Aenean metus massa, tempus nec tempus vel, ornare a elit.
          </p>
          <p>
            Donec pretium rhoncus turpis quis euismod. Morbi consequat luctus felis vitae mollis. Quisque quam ligula,
            accumsan id pharetra eu, condimentum quis elit. Phasellus ante justo, consectetur vel suscipit sit amet,
            auctor a felis. Aliquam sit amet magna tincidunt, pulvinar augue vel, dignissim metus. Vivamus accumsan non
            leo eu accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam eget metus pretium,
            placerat leo et, suscipit massa. Aenean varius turpis nec nulla dapibus, eu congue purus ultrices. Phasellus
            volutpat, leo in porta tempor, erat nibh pulvinar metus, at efficitur augue metus a odio. Etiam in efficitur
            turpis. Proin laoreet porta tristique. Morbi ut porttitor dui. Donec ut ex in enim gravida cursus. Sed
            elementum, leo sed placerat egestas, urna nibh mattis turpis, nec rhoncus eros erat vel orci. Aenean
            sollicitudin nisi tempor nisi sodales posuere.
          </p>
          <p>
            Quisque porttitor at diam vitae placerat. Donec euismod neque in justo placerat dapibus. Proin finibus,
            dolor bibendum viverra consectetur, lorem neque pulvinar elit, vitae auctor urna urna ac leo. Phasellus ac
            suscipit velit, non malesuada ante. Ut fringilla est non lorem posuere pellentesque. Aenean vel diam
            dapibus, vestibulum enim pellentesque, gravida libero. Morbi luctus nisi sit amet tellus euismod lobortis.
            Nulla facilisi. Integer in leo lectus. Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nam lectus purus, maximus eu ligula non, condimentum gravida erat. Etiam efficitur
            congue urna, ut lobortis neque fringilla id. Integer porttitor eros est, sed congue sapien accumsan vel.
          </p>
        </div>
      </div>
    </div>
  )
}
